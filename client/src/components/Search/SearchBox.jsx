import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { BiMicrophone } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { recognition } from "../../utils/SpeechRecognition";
import { useMediaQuery } from "@mui/material";

const SearchBox = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 700px)");
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
  return (
    <form onSubmit={SearchHandler} className="flex items-center w-full">
      <label htmlFor="voice-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="flex absolute inset-y-0 left-0 items-center md:pl-3 pl-2 pointer-events-none">
          <CgSearch className="text-xl text-gray-500" />
        </div>
        <input
          type="text"
          id="voice-search"
          required
          onChange={(e) => setQuery(e.target.value)}
          className="bg-white border md:border-2 md:border-gray-300 text-gray-900 text-sm rounded-xl md:rounded-lg focus:ring-purple-400 focus:border-purple-400 block w-full pl-10 p-2.5"
          placeholder={matches ? `Search, Smartphones, Laptop Products...`: "Search"}
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
        className="md:inline-flex hidden items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg- rounded-lg bg-[#f200ff] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <CgSearch className="md:text-lg mr-1 text-gray-50" />
        Search
      </button>
    </form>
  );
};

export default SearchBox;
