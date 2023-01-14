import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { BiMicrophone } from "react-icons/bi";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { recognition } from "../../utils/SpeechRecognition";

const SearchBox = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);
  const [voiceText, setVoiceText] = useState("");

  const SearchHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
  };
  const openVoiceSearch = () => {
    setIsVoiceSearch(true);
    recognition.start();
    recognition.onresult = (event) => {
      var current = event.resultIndex;
      var transcript = event.results[current][0].transcript;
      setVoiceText(voiceText + transcript);
      setQuery(voiceText + transcript);
    };
  };
  console.log(voiceText);
  return (
    <form onSubmit={SearchHandler} className="flex items-center w-full">
      <label htmlFor="voice-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <CgSearch className="md:text-xl text-gray-500" />
        </div>
        <input
          type="text"
          id="voice-search"
          required
          onChange={(e) => setQuery(e.target.value)}
          className="bg-white border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-400 focus:border-purple-400 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-400 dark:focus:border-purple-400"
          placeholder="Search, Smartphones, Laptop Products..."
        />
        <div
          onClick={() => openVoiceSearch()}
          className="flex absolute inset-y-0 right-0 items-center pr-3"
        >
          <BiMicrophone className="md:text-[22px] text-gray-500" />
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <CgSearch className="md:text-lg mr-1 text-gray-50" />
        Search
      </button>
      {/* <Button size="md" variant="gradient" className="ml-2">
        <div className="flex_center">
          <CgSearch className="md:text-lg mr-1 text-gray-50" />
          <span className="ml-2">Search</span>
        </div>
      </Button> */}
    </form>
  );
};

export default SearchBox;
