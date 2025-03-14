import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Input, Select, RTE, } from '.././index'
import service from '../../appwrite/config'
import { useForm } from 'react-hook-form'

export default function PostForm({ post }) {

    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',

        },

    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        setLoading(true);

        try {
            let file;
            if (data.image?.[0]) {
                file = await service.uploadFile(data.image[0]);
            }

            if (post) {
                const updatedPost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });

                navigate(`/post/${updatedPost.$id}`);
            } else {
                const newPost = await service.createPost({
                    ...data,
                    featuredImage: file ? file.$id : null,
                    userId: userData.$id,
                    
                });
                navigate(`/post/${newPost.$id}`);
            }
        } finally {
            setLoading(false);
        }


        //     if (post) {
        //         const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

        //         if (file) {
        //             service.deleteFile(post.featuredImage);
        //         }

        //         const dbPost = await service.updatePost(post.$id, {
        //             ...data,
        //             featuredImage: file ? file.$id : undefined
        //         })

        //         if (dbPost) {
        //             navigate(`/post/${dbPost.$id}`)
        //         }

        //     } else {

        //         const file = await service.uploadFile(data.image[0]);

        //         if (file) {

        //             const fileId = file.$id;
        //             data.featuredImage = fileId;

        //             const dbPost = await service.createPost({ ...data, userId: userData.$id });

        //             if (dbPost) {
        //                 navigate(`/post/${dbPost.$id}`)

        //             }

        //         }
        //     }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <>
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
          <div className="w-2/3 px-2">
            <label className="label">
              <span className="label-text">Title :</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full mb-4"
              {...register("title", { required: true })}
            />
            <label className="label">
              <span className="label-text">Slug :</span>
            </label>
            <input
              type="text"
              placeholder="Slug"
              className="input input-bordered w-full mb-4"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
              }}
            />
            <label className="label">
              <span className="label-text">Content :</span>
            </label>
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
          </div>
      
          <div className="w-1/3 px-2">
            <label className="label">
              <span className="label-text">Featured Image :</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
            {loading ? (
              <p>Loading image preview...</p>
            ) : (
              post?.featuredImage && (
                <div className="w-full mb-4">
                  <img
                    src={service.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                  />
                </div>
              )
            )}
            <label className="label">
              <span className="label-text">Status :</span>
            </label>
            <select
              className="select select-bordered w-full mb-4"
              {...register("status", { required: true })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button
              type="submit"
              className={`btn w-full ${post ? "btn-success" : "btn-primary"}`}
            >
              {post ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </>
      
    )
}