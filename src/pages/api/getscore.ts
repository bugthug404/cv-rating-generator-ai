import { NextApiRequest, NextApiResponse } from "next";
import {
  GoogleGenerativeAI,
  GenerativeModel,
  FunctionDeclarationSchemaType,
} from "@google/generative-ai";

let genAI: GoogleGenerativeAI;
let generativeModel: GenerativeModel;

const sdJD = "csdfaf"; // Replace with your sample job description
const sdcv3 = "adfasdf"; // Replace with your sample CV data

// Simple rate limiting (in-memory, not persistent)
const MAX_REQUESTS_PER_MINUTE = 2;
let requestCount = 0;
let lastResetTime = Date.now();

const MAX_LENGTH = 4000; // characters

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Rate limiting logic
    if (Date.now() - lastResetTime >= 60000) {
      requestCount = 0;
      lastResetTime = Date.now();
    }
    requestCount++;
    if (requestCount > MAX_REQUESTS_PER_MINUTE) {
      return res
        .status(429)
        .json({ error: "Too many requests, please try again later." });
    }

    const { jobDescription = sdJD, cvData = sdcv3 } = req.body;

    // Check if jobDescription and cvData exceed MAX_LENGTH
    if (jobDescription.length > MAX_LENGTH || cvData.length > MAX_LENGTH) {
      return res.status(400).json({
        error:
          "Job description or CV data exceeds the maximum allowed length 4000 characters.",
      });
    }

    console.log("body data --- ", jobDescription, cvData);

    if (!jobDescription || !cvData) {
      return res.status(400).json({
        error: "missing required parameters for this request.",
      });
    }

    if (!genAI || !generativeModel) {
      genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

      generativeModel = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `
      System: strictly do not use markdown formating for the output. keep response presice & to the point. strictly follow output format example. strictly do not use new line characters in output. get candidate information from resume. Make sure to return valid JSON.

      RatingScale: [
        {
          scoreRange: 91-100,
          description: "Candidate's resume showcases skills that perfectly align with the job description, including some additional directly relevant skills not mentioned. Their experience is highly relevant and directly applies to the job requirements."
        },
        {
          scoreRange: 81-90,
          description: "Candidate's resume demonstrates skills that mostly align with the job description. They possess transferable skills that could be adapted to the role. Their experience is highly relevant and directly applies to the job requirements."
        },
        {
          scoreRange: 71-80,
          description: "Candidate's resume highlights skills that partially align with the job description. They might have some directly relevant skills, but also some irrelevant ones. Their experience is somewhat relevant, but may require additional training for the specific job requirements."
        },
        {
          scoreRange: 61-70,
          description: "Candidate's resume showcases skills that have some overlap with the job description, but there are also significant gaps. Their experience is relevant in a different context, and may not directly translate to this role."
        },
        {
          scoreRange: 51-60,
          description: "A few of the candidate's skills or experience  don't directly match the job description. They might have some transferable skills, but may require significant upskilling or reskilling."
        },
        {
          scoreRange: 41-50,
          description: "Candidate's resume exhibits skills that mostly don't match the job description. While there might be some transferable skills, significant gaps exist. Their experience is not directly relevant and may require substantial adaptation for this role."
        },
        {
          scoreRange: 31-40,
          description: "Candidate's resume presents skills that are very different from the job description. They might have some relevant experience, but it's in a completely different field and may not be easily transferable."
        },
        {
          scoreRange: 21-30,
          description: "Candidate's resume showcases skills that have minimal alignment with the job description. They lack directly relevant skills and experience seems unrelated to the position's requirements."
        },
        {
          scoreRange: 11-20,
          description: "Candidate's resume offers very little that aligns with the job description. The skills and experience  presented  appear irrelevant to the role. Consider reviewing the resume format or if it's for the correct position."
        },
        {
          scoreRange: 1-10,
          description: "The resume appears invalid or incomplete, or the job description might be missing crucial information. It's difficult to assess the candidate's fit based on the provided documents. Consider requesting a revised resume or a more detailed job description."
        }
      ]

    Generate Output Format Example: { "score": select a number from the scoreRange based on how suitable is the resume, "candidateInfo": { "name": "John", "email": "john@example.com", "role": "Accountant", "phone": "+1234567890", "location": "New York, NY", }, "error": "cannot your process due to invalid input data"  | null }

    Generate response: Get RatingScale score as a output for user query. important- Throw error in output if Job description is not valid.
      `,
      });
    }

    const prompt3 = `
    Query: How much is Resume suitable according to the RatingScale.
    
    Job Description: ${jobDescription}

    Resume: ${cvData}
    `;

    const tokens = prompt3.split(" ").length;

    console.log("tokens --", tokens);

    const chat = generativeModel.startChat({
      generationConfig: {
        responseSchema: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            scoreRange: {
              type: FunctionDeclarationSchemaType.NUMBER,
              properties: {},
            },
          },
        },
      },
    });

    let result = await chat.sendMessage(prompt3);

    console.log("gemini output  --", result.response.text().substring(0, 50));
    console.log("gemini output JSON --", JSON.parse(result.response.text()));

    res.status(200).json({
      response: result.response.text(),
    });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message ?? "Internal server error" });
  }
}
