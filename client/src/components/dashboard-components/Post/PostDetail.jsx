import { CircularProgress } from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineEye } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../../redux/post";
import { HelmetTitle } from "../../../utils";
import { Layout } from "../Layouts";

const PostDetail = () => {
  let { t } = useTranslation(["dashboard"]);
  const { isLoading, post } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPost({ id }));
  }, [dispatch, id]);
  return (
    <>
      <HelmetTitle title={t("post-detail")} />
      <Layout>
        {!isLoading && post ? (
          <div className="relative px-10">
            <div className="w-full flex_center">
              <img
                src={post.image?.url}
                className="h-80 w-full object-cover rounded-lg"
                alt={post.title}
              />
            </div>
            <div className="flex_betwen my-2 text-gray-500">
              <div className="flex_center">
                <BsCalendarDate className="mr-1" />
                <span>{moment(post.createdAt).format("lll")}</span>
              </div>
              <div className="flex_center">
                <AiOutlineEye className="mr-1 text-xl" />
                <span>{post.viewsCount}</span>
              </div>
            </div>
            <h1 className="my-4 font-semibold text-4xl">{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
          </div>
        ) : (
          <CircularProgress />
        )}
      </Layout>
    </>
  );
};

export default PostDetail;
