import React, { useState, useEffect } from 'react';
import {
	useFetchAllPostsQuery,
	useCreatePostMutation,
	useUpdatePostMutation,
	useDeletePostMutation
} from "../services/PostService";
import PostItem from "./PostItem";
import {IPost} from "../models/IPost";

const PostContainer = () => {
	const [limit, setLimit] = useState(25);
	const {data: posts, isLoading, error} = useFetchAllPostsQuery(limit, {
		pollingInterval: 10000
	})
	const [createPost, {data: createdPost, error: postError, isLoading: postLoading}] = useCreatePostMutation()

	const [updatePost, {data: updatedPost, error: updatedPostError, isLoading: updatedPostLoading}] = useUpdatePostMutation()
	const [deletePost, {data: removeedPost, error: removeedPostError, isLoading: removeedPostLoading}] = useDeletePostMutation()
	
	const handleCreate = async () => {
		const title = prompt()
		await createPost({title, body: title} as IPost)
	}


	const handleRemove = (post: IPost) => {
		deletePost(post)
	}

	const handleUpdate = (post: IPost) => {
		updatePost(post)
	}
	
	return (
		<div className='post__list'>
			<button onClick={handleCreate}>Add new post</button>
			{isLoading && <h1>Идет загрузка...</h1>}
			{error && <h1>Произошла ошибка при загрузке</h1>}
			{posts && posts.map(post => (
				<PostItem key={post.id} post={post} update={handleUpdate} remove={handleRemove} />
			))}
		</div>
	);
};

export default PostContainer;
