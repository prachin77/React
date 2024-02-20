import React, { useState, useEffect } from 'react';
import ReactTagInput from '@pathofdev/react-tag-input';
import { Link } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const initialState = {
    title: '',
    tags: [],
    category: '',
    description: '',
};

const categoryOptions = [
    'Technology',
    'Sports',
    'Philosophy',
    'Politics',
    'Mythological',
    'History',
    'Food',
    'Education',
    'Travel',
    'Other',
];

const CreateBlog = ({user}) => {
    const [form, setForm] = useState(initialState);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);

    // useEffect(() => {
    //     // const uploadFile = () => {
    //     //     const storageRef = ref(storage , file.name);
    //     //     const uploadTask = uploadBytesResumable(storageRef , file);
    //     //     uploadTask.on("state_changed",(snapshot) => {
    //     //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     //         setProgress(snapshot.state);
    //     //         switch(snapshot.state){
    //     //             case "paused":
    //     //                 console.log("upload is paused");
    //     //                 break;
    //     //             case "running":
    //     //                 console.log("uploading");
    //     //                 break;
    //     //             default:
    //     //                 break;
    //     //         }
    //     //     },(error) => {
    //     //         console.log(error);
    //     //     },() => {
    //     //         getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
    //     //             setForm((prev) => ({...prev , imgUrl : downloadUrl}))
    //     //         })
    //     //     })
    //     // }
    //     const uploadFile = () => {
    //         const storageRef = ref(storage, file.name);
    //         const uploadTask = uploadBytesResumable(storageRef, file);

    //         uploadTask.on("state_changed", (snapshot) => {
    //             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //             setProgress(progress);

    //             switch (snapshot.state) {
    //                 case "paused":
    //                     console.log("Upload is paused");
    //                     break;
    //                 case "running":
    //                     console.log("Uploading");
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         }, (error) => {
    //             console.error(error);
    //         }, () => {
    //             getDownloadURL(uploadTask.snapshot.ref)
    //                 .then((downloadUrl) => {
    //                     setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
    //                     setProgress(null); // Reset progress after successful upload
    //                 })
    //                 .catch((error) => {
    //                     console.error(error);
    //                 });
    //         });
    //     };

    //     file && uploadFile();
    // }, [file])

    const handleChange = (event) => {
        setForm({...form , [event.target.name] : event.target.value})
    };

    // const handleTags = (newTags) => {
    //     setForm((prevForm) => ({
    //         ...prevForm,
    //         tags: newTags,
    //     }));
    // };

    const onCategoryChange = (event) => {
        setForm({...form,category:event.target.value})
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        // Add your logic for submitting the form data
        if(title && description && category){
            try {
                await addDoc(collection(db , "blogs"),{
                    ...form,
                    Timestamp : serverTimestamp(),
                    author : user.displayName,
                    userId : user.uid
                })
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
        console.log('Form submitted:', form);
        alert("blog created");
    };

    const { title, tags, category, description } = form;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <form onSubmit={handleSubmit}>
                {/* <label className="block mb-4">
                    <h2>Blog Thumbnail </h2>
                    <input type="file" onChange={(event) => setFile(event.target.files)} />
                </label> */}
                <label className="block mb-4">
                    <input
                        type="text"
                        name="title"
                        value={title}
                        placeholder="Title"
                        onChange={handleChange}
                        className="form-input text-3xl p-2 mt-1 block w-full h-15 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block mb-4">
                    <select
                        name="category"
                        value={category}
                        onChange={onCategoryChange}
                        className="form-select mt-1 block w-full border border-gray-300 rounded-md"
                    >
                        <option value="">Select Category</option>
                        {categoryOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block mb-4">
                    <textarea
                        rows="15"
                        cols="50"
                        name="description"
                        value={description}
                        placeholder='Description'
                        onChange={handleChange}
                        className="p-3 text-2xl form-textarea mt-1 block w-full border border-gray-300 rounded-md"
                    ></textarea>
                </label>

                {/* <label className="block mb-4">
                    <ReactTagInput
                        tags={tags}
                        onChange={handleTags}
                        placeholder="Add tags"
                    />
                </label> */}

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateBlog;
