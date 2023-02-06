import { Avatar, AvatarGroup, Button, Checkbox, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiExport, BiSearch, BiTable } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";
import { FiEdit, FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HelmetTitle from "../../utils/HelmetTitle";
import Layout from "../Layout";
import GridList from "./GridList";
import TableBody from "./TableBody";

const BrandsList = () => {
  const { access_token } = useSelector((state) => state.auth);
  const [brands, setBrands] = useState([]);
  const [term, setTerm] = useState("");
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTable, setIsTable] = useState(false);
  const fetchData = async () => {
    const { data } = await axios.get("/brands");
    setBrands(data.brands);
    setLoading(false);
  };

  const filteredBrands = brands.filter((frontMatter) => {
    const searchContent = frontMatter.name;
    return searchContent.toLowerCase().includes(term.toLowerCase());
  });

  const handleSelectAll = (e) => {
    let newSelectedBrandIds;

    if (e.target.checked) {
      newSelectedBrandIds = brands.map((brand) => brand._id);
    } else {
      newSelectedBrandIds = [];
    }

    setSelectedBrandIds(newSelectedBrandIds);
  };

  const handleSelectOne = (e, _id) => {
    const selectedIndex = selectedBrandIds.indexOf(_id);
    let newSelectedBrandIds = [];

    if (selectedIndex === -1) {
      newSelectedBrandIds = newSelectedBrandIds.concat(
        selectedBrandIds,
        _id
      );
    } else if (selectedIndex === 0) {
      newSelectedBrandIds = newSelectedBrandIds.concat(
        selectedBrandIds.slice(1)
      );
    } else if (selectedIndex === selectedBrandIds.length - 1) {
      newSelectedBrandIds = newSelectedBrandIds.concat(
        selectedBrandIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedBrandIds = newSelectedBrandIds.concat(
        selectedBrandIds.slice(0, selectedIndex),
        selectedBrandIds.slice(selectedIndex + 1)
      );
    }

    setSelectedBrandIds(newSelectedBrandIds);
  };

  const deleteBrand = async (id) => {
    try {
      await axios.delete(`/brand/${id}`, {
        headers: {
          Authorization: access_token,
        },
      });
      fetchData();
      toast.success("Deleted product");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [checked, setChecked] = useState(false);
  const checkToggle = (checked) => {
    setChecked(!checked);
  };
  return (
    <>
    <HelmetTitle title="All brands" />
    <Layout>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="bg-white dark:bg-[#2e2d4a] rounded-lg overflow-hidden my-6 border border-gray-300 dark:border-gray-600">
            <h1 className="p-5 text-gray-600 dark:text-gray-200 text-xl font-semibold">
              Search Filter
            </h1>
            <div className="grid grid-cols-3 gap-x-5 pb-6 mb-3 px-5 border-b border-b-gray-200 dark:border-b-gray-600">
              <FormControl size="medium" sx={{}}>
                <InputLabel _id="demo-simple-select-label">
                  Select brand
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  _id="demo-simple-select"
                  // value={"all"}
                  // onChange={(e) => setCategory(e.target.value)}
                  label="Select brand"
                >
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"user"}>brands</MenuItem>
                  <MenuItem value={"admin"}>Admins</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="medium" sx={{}}>
                <InputLabel _id="demo-simple-select-label">
                  Select Brand
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  _id="demo-simple-select"
                  // value={"all"}
                  // onChange={(e) => setCategory(e.target.value)}
                  label="Select Brand"
                >
                  <MenuItem value={"all"}>Date</MenuItem>
                  <MenuItem value={"user"}>Name</MenuItem>
                  <MenuItem value={"admin"}>Status</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="medium" sx={{}}>
                <InputLabel _id="demo-simple-select-label">
                  Select Rating
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  _id="demo-simple-select"
                  // value={"all"}
                  // onChange={(e) => setCategory(e.target.value)}
                  label="Select Rating"
                >
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"user"}>brands</MenuItem>
                  <MenuItem value={"admin"}>Admins</MenuItem>
                </Select>
              </FormControl>
            </div>
            {selectedBrandIds.length ? (
              <div className="flex w-ful items-center justify-between py-[12.5px] px-4">
                <h1 className="font-semibold text-gray-700">{`${selectedBrandIds.length} Selected`}</h1>
                <Button
                  variant="contained"
                  color="error"
                  size="medium"
                  sx={{
                    marginLeft: "15px",
                    borderRadius: "6px",
                    minWidth: "130px",
                  }}
                  startIcon={<MdDelete />}
                >
                  DELETE
                </Button>
              </div>
            ) : (
              <div className="flex w-full items-center justify-between py-3 px-4">
                <FormControl size="small" sx={{ minWidth: "80px" }}>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    value={"10"}
                    // onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem value={"10"}>10</MenuItem>
                    <MenuItem value={"20"}>20</MenuItem>
                    <MenuItem value={"30"}>30</MenuItem>
                    <MenuItem value={"50"}>50</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 500 }}>
                  <TextField
                    size="small"
                    fullWidth
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BiSearch className="text-xl" />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Search"
                    variant="outlined"
                  />
                </FormControl>
                <div className="flex items-center">
                  <IconButton
                    onClick={() => setIsTable(false)}
                    aria-label="Table"
                    color={!isTable ? "secondary" : "default"}
                  >
                    <BiTable />
                  </IconButton>
                  <IconButton
                    onClick={() => setIsTable(true)}
                    aria-label="Table"
                    color={isTable ? "secondary" : "default"}
                  >
                    <BsGrid />
                  </IconButton>
                  <Button
                    disabled
                    variant="outlined"
                    size="medium"
                    sx={{
                      marginLeft: "25px",
                      borderRadius: "6px",
                    }}
                    startIcon={<BiExport />}
                  >
                    EXPORT
                  </Button>
                  <Link to={"/brand/add"}>
                    <Tooltip title="Add new user">
                      <Button
                        variant="contained"
                        size="medium"
                        sx={{
                          marginLeft: "25px",
                          background: "rgb(145, 85, 253)",
                          borderRadius: "6px",
                        }}
                        startIcon={<FiPlus />}
                      >
                        ADD NEW brand
                      </Button>
                    </Tooltip>
                  </Link>
                </div>
              </div>
            )}

            {!isTable ? (
              <TableBody
                brands={brands}
                handleSelectAll={handleSelectAll}
                selectedBrandIds={selectedBrandIds}
                filteredBrands={filteredBrands}
                handleSelectOne={handleSelectOne}
                deleteBrand={deleteBrand}
              />
            ) : (
              <GridList
                brands={brands}
                handleSelectAll={handleSelectAll}
                selectedBrandIds={selectedBrandIds}
                filteredBrands={filteredBrands}
                handleSelectOne={handleSelectOne}
                deleteBrand={deleteBrand}
              />
            )}
          </div>
        </>
      )}
    </Layout>
  </>
    // <>
    //   <HelmetTitle title={"All Brands"} />
    //   <Layout>
    //     <div className="bg-white mx-5 dark:bg-[#2e2d4a] rounded-lg overflow-hidden my-6 border border-gray-300">
    //       <Link
    //         to={"/brand/create"}
    //         className="w-full flex items-center justify-end"
    //       >
    //         <Tooltip content="Add new brand">
    //           <Button
    //             variant="contained"
    //             size="large"
    //             sx={{
    //               marginY: "8px",
    //               marginRight: "8px",
    //               background: "rgb(145, 85, 253)",
    //               borderRadius: "10px",
    //             }}
    //           >
    //             create brand
    //           </Button>
    //         </Tooltip>
    //       </Link>
    //       <table className="min-w-max w-full table-auto rounded-lg ">
    //         <thead>
    //           <tr className="bg-gray-300 dark:bg-[#232338] text-gray-700 dark:text-gray-200 text-sm rounded-t-lg leading-normal global-font">
    //             <th className="py-3">
    //               <Checkbox onChange={checkToggle} />
    //             </th>
    //             <th className="py-3 px-6 text-left">Name</th>
    //             <th className="py-3 px-6 text-center">CreatedBy</th>
    //             <th className="py-3 px-6 text-center">Products</th>
    //             <th className="py-3 px-6 text-center">CreatedAt</th>
    //             <th className="py-3 px-6 text-center">Actions</th>
    //           </tr>
    //         </thead>
    //         <tbody className="text-gray-600 dark:text-gray-300 text-sm font-light">
    //           {brands
    //             .map((brand, index) => (
    //               <tr
    //                 key={index}
    //                 className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 font-semibold hover:dark:bg-gray-600"
    //               >
    //                 <td className="py-3 flex_center">
    //                   <Checkbox sx={{ borderRadius: 5 }} />
    //                 </td>
    //                 <td className="py-3 px-3 whitespace-nowrap">
    //                   <div className="flex justify-start items-center">
    //                     <div className="mr-4">
    //                       <img
    //                         className="w-10 h-10 rounded"
    //                         src={brand.image.url}
    //                         alt={brand.name}
    //                       />
    //                     </div>
    //                     <span className="mr-2 uppercase">{brand.name}</span>
    //                   </div>
    //                 </td>
    //                 <td className="py-3 px-6 text-center">
    //                   <div className="flex justify-center items-center">
    //                     <div className="mr-2">
    //                       <Avatar
    //                         src="https://www.material-tailwind.com/img/face-2.jpg"
    //                         alt="avatar"
    //                         size="sm"
    //                       />
    //                     </div>
    //                     <div className="block"></div>
    //                     <span className="mr-2">
    //                       {brand.createdBy
    //                         ? brand.createdBy.name
    //                         : "deleted account"}
    //                     </span>
    //                   </div>
    //                 </td>
    //                 <td className="py-3 px-6 text-center">
    //                   <div className="flex justify-center items-center">
    //                     <AvatarGroup total={24}>
    //                       <Avatar
    //                         sx={{ borderRadius: "12px" }}
    //                         alt="Travis Howard"
    //                         src="https://www.material-tailwind.com/img/face-2.jpg"
    //                       />
    //                       <Avatar
    //                         sx={{ borderRadius: "12px" }}
    //                         alt="Agnes Walker"
    //                         src="https://www.material-tailwind.com/img/face-2.jpg"
    //                       />
    //                       <Avatar
    //                         sx={{ borderRadius: "12px" }}
    //                         alt="Trevor Henderson"
    //                         src="https://www.material-tailwind.com/img/face-2.jpg"
    //                       />
    //                     </AvatarGroup>
    //                     <span className="mr-2">15 pct</span>
    //                   </div>
    //                 </td>
    //                 <td className="py-3 px-6 text-center">
    //                   <div className="flex justify-center items-center">
    //                     <span>{moment(brand.createdAt).format("lll")}</span>
    //                   </div>
    //                 </td>

    //                 <td className="py-3 px-6 text-center">
    //                   <div className="flex item-center justify-center">
    //                     <Link
    //                       to={`/brand/${brand._id}`}
    //                       className="cursor-pointer w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
    //                     >
    //                       <svg
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         fill="none"
    //                         viewBox="0 0 24 24"
    //                         stroke="currentColor"
    //                       >
    //                         <path
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           strokeWidth="2"
    //                           d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    //                         />
    //                         <path
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           strokeWidth="2"
    //                           d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    //                         />
    //                       </svg>
    //                     </Link>
    //                     <Link to={`/brand/${brand._id}`}>
    //                       <div className="cursor-pointer w-5 mr-3 transform hover:text-purple-500 hover:scale-110">
    //                         <FiEdit className="text-lg" />
    //                       </div>
    //                     </Link>
    //                     <button
    //                       onClick={() => deleteHandler(brand._id)}
    //                       className="cursor-pointer w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
    //                     >
    //                       <svg
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         fill="none"
    //                         viewBox="0 0 24 24"
    //                         stroke="currentColor"
    //                       >
    //                         <path
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           strokeWidth="2"
    //                           d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    //                         />
    //                       </svg>
    //                     </button>
    //                   </div>
    //                 </td>
    //               </tr>
    //             ))
    //             .reverse()}
    //         </tbody>
    //       </table>
    //     </div>
    //   </Layout>
    // </>
  );
};

export default BrandsList;
