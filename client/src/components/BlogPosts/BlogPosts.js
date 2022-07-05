import React, { useEffect, useState } from "react";
import {
  Typography,
  CardMedia,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core/";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import { useDispatch } from "react-redux";
import blogImageLogo from "../../Assets/blogLogo.gif";

import { upvoteBlogPosts, removeBlogPosts, editBlogPosts } from "../../actions/blogPosts";
import useStyles from "./styles";

const BlogPosts = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const blogPostStyles = useStyles();
  const[updateMode, setUpdateMode] = React.useState(false);

  return (
    <>
      <Card className={blogPostStyles.blogContainer}>
        <CardMedia
          className={blogPostStyles.imageContainer}
          image={post.fileUpload || blogImageLogo}
          title={post.title}
        />
        <div className={blogPostStyles.nameOverlay}>
          <Typography variant="h6">{post.creator}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={blogPostStyles.editOverlay}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setUpdateMode(true)}
          >
            <EditIcon fontSize="default" />
          </Button>
        </div>
        <div className={blogPostStyles.tagSection}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {/* {post.tags.map((tag) => `#${tag} `)} */}
          </Typography>
        </div>
        {
          updateMode ? ( <input type="text" value ={post.title}/> ) : (
        <Typography
          className={blogPostStyles.titleSection}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        )}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.description}
          </Typography>
        </CardContent>
        <CardActions className={blogPostStyles.cardActions}>
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(upvoteBlogPosts(post._id))}
          >
            <ArrowUpwardIcon fontSize="small" /> {post.likeCount}{" "}
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(removeBlogPosts(post._id))}
          >
            <DeleteIcon fontSize="big" />
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default BlogPosts;
