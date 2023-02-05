import React, { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { BiMicrophone } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { recognition } from "../../utils/SpeechRecognition";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import AutoComplate from "./AutoComplate";

const SearchBox = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 700px)");
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);
  const [voiceText, setVoiceText] = useState("");

  const handleAutoComplete = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    const newFilterAutoComplete = products.filter((value) => {
      return value.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (searchTerm === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilterAutoComplete);
    }
  };

  const fetchData = async () => {
    const { data } = await axios.get("/products");
    setProducts(data.products);
    setLoading(false);
  };
  const clearFilter = () => {
    setFilteredData([]);
    setQuery("");
  };
  const SearchHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
    setFilteredData([]);
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
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="relative">
      <form
        onSubmit={SearchHandler}
        autoComplete="off"
        className="flex items-center w-full"
      >
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
            value={query}
            onChange={handleAutoComplete}
            className="lg:w-[600px] md:w-[420px] w-full bg-white border md:border-2 md:border-gray-300 text-gray-900 text-sm rounded-lg md:rounded-lg focus:ring-purple-400 focus:border-purple-400 block pl-10 p-2.5"
            placeholder={
              matches ? `Search, Smartphones, Laptop Products...` : "Search"
            }
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
      <AutoComplate
        filteredData={filteredData}
        query={query}
        clearFilter={clearFilter}
      />
    </div>
  );
};

export default SearchBox;
