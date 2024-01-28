import React from "react";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "./WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

export default function MyPost({ picturePath }) {
  const dispatch = useDispatch();
  const [isImage, setisImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user) || {};
  const token = useSelector((state) => state.token);
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturepath", image.name);
    }
    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const newPost = await response.json();
    dispatch(setPosts(newPost));
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper >
      <div className="flex justify-between items-center gap-6">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="Talk something..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          style={{backgroundColor:palette.neutral.light}}
          className={`w-full rounded-[2rem] bg-$[palette.neutral.light] px-2 py-4 mb-2` }
          sx={{
            width: "100%",
            borderRadius: "2rem",
            backgroundColor: palette.neutral.light,
            padding: "0.5rem 1rem",
          }}
        />
      </div>
      {isImage && (
        <Box className={`border-solid border-${medium} rounded-sm mt-4 p-4`}>
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="flex justify-between items-center">
                <Box
                  {...getRootProps()}
                  className={`border-dashed border-2 border-${palette.primary.main} p-2 hover:cursor-pointer`}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <div className="flex justify-between items-center">
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </div>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </div>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider className="mx-5 my-0" />
      <div className="flex justify-between items-center mt-2">
        <div
          className="flex justify-between items-center gap-1"
          onClick={() => setImage(!isImage)}
        >
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            className={`text-${mediumMain} hover:cursor-pointer hover:text-${medium}`}
          >
            Image
          </Typography>
        </div>
        {isNonMobile ? (
          <>
            <div className="flex justify-between items-center gap-1 ">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography className={`text-${mediumMain}`}>Clip</Typography>
            </div>

            <div className="flex justify-between items-center gap-1 ">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography className={`text-${mediumMain}`}>
                Attachment
              </Typography>
            </div>
            <div className="flex justify-between items-center gap-1 ">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography className={`text-${mediumMain}`}>Audio</Typography>
            </div>
          </>
        ) : (
          <div className="flex justify-between items-center gap-1">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </div>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "2rem",
     
          }}
        >
          POST
        </Button>
      </div>
    </WidgetWrapper>
  );
}
