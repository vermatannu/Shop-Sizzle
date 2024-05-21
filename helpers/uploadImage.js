const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;
console.log(url); 

const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "shopsizzle");

    try {
        const dataResponse = await fetch(url, {
            method: "POST",
            body: formData
        });

        if (!dataResponse.ok) {
            throw new Error('Image upload failed');
        }

        const data = await dataResponse.json();
        return data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error; // Rethrow the error after logging it
    }
};

export default uploadImage;
