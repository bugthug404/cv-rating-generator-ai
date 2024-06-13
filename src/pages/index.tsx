import { Inter } from "next/font/google";
import { useState } from "react";
import TestDataButtons from "../components/test-data-buttons";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  interface APIRes {
    score?: number;
    candidateInfo?: {
      name: string;
      email: string;
      role: string;
      phone: string;
      location: string;
    };
    error?: string;
  }
  const [jd, setjd] = useState("");
  const [cv, setcv] = useState("");
  const [res, setres] = useState<APIRes | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-center pt-5">
      <div className="max-w-xl bg-gray-800 w-full p-4 rounded-lg">
        <div className="text-center text-2xl font-bold">
          CV Score Generator AI
        </div>
        <div className="text-center text-xs mb-4 font-light mt-2">
          Just paste job description & resume text to get compatibilty score
        </div>

        <div>Job Description</div>
        <textarea
          value={jd}
          onChange={(e) => setjd(e.target.value)}
          rows={4}
          className="no-scrollbar bg-black rounded-md mt-1 w-full px-1 outline-none"
        />
        <div>Resume</div>
        <textarea
          value={cv}
          onChange={(e) => setcv(e.target.value)}
          rows={4}
          className="no-scrollbar bg-black rounded-md mt-1 w-full px-1 outline-none"
        />

        <TestDataButtons setcv={setcv} setjd={setjd} />

        <button
          onClick={() => {
            if (loading) return;
            if (jd.length < 10 || cv.length < 10)
              return setres({ error: "Please fill all form fields" });
            setLoading(true);
            try {
              const response = fetch("/api/getscore", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  jobDescription: jd,
                  cvData: cv,
                }),
              });
              response
                .then(async (res) => {
                  return await res.json();
                })
                .then((data: any) => {
                  const res = JSON.parse(data.response);
                  if (res) {
                    setres(res);
                  } else {
                    setres({
                      error: "something went wrong! Please try again later",
                    });
                  }
                })
                .catch((error) => {
                  setres({
                    error:
                      error?.message ||
                      "something went wrong! Please try again later",
                  });
                })
                .finally(() => setLoading(false));
            } catch (error: any) {
              setres({
                error:
                  error?.message ||
                  "something went wrong! Please try again later",
              });
            }
          }}
          type="button"
          className={`bg-gray-700 w-full mt-2 rounded-md py-2 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {loading ? "Calculating..." : "Get Score"}
        </button>

        <div className="mt-2 text-sm font-light">
          {res?.error ? (
            <div className="text-center">{res?.error}</div>
          ) : res?.score ? (
            <div className="bg-gray-950 p-2 rounded-md w-full">
              <div>Score : {res?.score}</div>
              <div>Name : {res?.candidateInfo?.name}</div>
              <div>Email : {res?.candidateInfo?.email}</div>
              <div>Role : {res?.candidateInfo?.role}</div>
              <div>Phone : {res?.candidateInfo?.phone}</div>
              <div>Location : {res?.candidateInfo?.location}</div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
