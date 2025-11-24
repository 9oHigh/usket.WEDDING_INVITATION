import React, { useState } from "react";

const AccountScreen = () => {
  const [trustExpanded, setTrustExpanded] = useState(true);
  const [newExpanded, setNewExpanded] = useState(true);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6]">
      {/* Header */}

      <h2 className="text-sm font-cafe24 text-gray-500 mt-8 mb-1 tracking-widest">
        FOR YOUR KIND BLESSING
      </h2>
      <h2 className="text-xl font-cafe24 font-bold text-gray-800">
        마음 전하실 곳
      </h2>

      {/* Trust Account Section */}
      <div className="mx-4 mb-4 mt-8">
        <button
          onClick={() => setTrustExpanded(!trustExpanded)}
          className="w-full bg-[#E4D4C8] rounded-lg px-6 py-4 flex justify-between items-center shadow-sm"
        >
          <span className="font-cafe24 text-gray-800 text-l">
            신랑측 계좌번호
          </span>
          {trustExpanded ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-gray-400"
            >
              <path
                d="M5 12.5L10 7.5L15 12.5"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-gray-400"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        {trustExpanded && (
          <div className="bg-white rounded-lg mt-2 divide-y divide-gray-100">
            {/* Account 1 */}
            <div className="px-6 py-5">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-cafe24 text-gray-500">농협</span>
                  <span className="font-cafe24 text-gray-800 tracking-wide">
                    203083-56-006575
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard("20308356006575")}
                  className="font-cafe24 px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50"
                >
                  복사
                </button>
              </div>
              <div className="font-cafe24 text-left text-gray-600 text-sm">
                이금철
              </div>
            </div>

            {/* Account 2 */}
            <div className="px-6 py-5">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-cafe24 text-gray-500">토스뱅크</span>
                  <span className="font-cafe24 text-gray-800 tracking-wide">
                    1000-0148-8126
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard("100001488126")}
                  className="font-cafe24 px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50"
                >
                  복사
                </button>
              </div>
              <div className="font-cafe24 text-left text-gray-600 text-sm">
                이경후
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Account Section */}
      <div className="mx-4 mb-4">
        <button
          onClick={() => setNewExpanded(!newExpanded)}
          className="w-full bg-[#E4D4C8] rounded-lg px-6 py-4 flex justify-between items-center shadow-sm"
        >
          <span className="font-cafe24 text-gray-800 text-l">
            신부측 계좌번호
          </span>
          {newExpanded ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-gray-400"
            >
              <path
                d="M5 12.5L10 7.5L15 12.5"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-gray-400"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        {newExpanded && (
          <div className="bg-white rounded-lg mt-2 divide-y divide-gray-100">
            {/* Account 1 */}
            <div className="px-6 py-5">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-cafe24 text-gray-500">우리은행</span>
                  <span className="font-cafe24 text-gray-800 tracking-wide">
                    255-005186-02-001
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard("25500518602001")}
                  className="font-cafe24 px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50"
                >
                  복사
                </button>
              </div>
              <div className="font-cafe24 text-left text-gray-600 text-sm">
                김종태
              </div>
            </div>

            {/* Account 2 */}
            <div className="px-6 py-5">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-cafe24 text-gray-500">우리은행</span>
                  <span className="font-cafe24 text-gray-800 tracking-wide">
                    1002-4634-28768
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard("1002463428768")}
                  className="font-cafe24 px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50"
                >
                  복사
                </button>
              </div>
              <div className="font-cafe24 text-left text-gray-600 text-sm">
                박효경
              </div>
            </div>

            {/* Account 3 - Kakao Pay */}
            <div className="px-6 py-5">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-cafe24 text-gray-500">우리은행</span>
                  <span className="font-cafe24 text-gray-800 tracking-wide">
                    1002-151-197398
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard("1002151197398")}
                  className="font-cafe24 px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50"
                >
                  복사
                </button>
              </div>
              <div className="font-cafe24 text-gray-600 text-sm text-left">
                김유진
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountScreen;
