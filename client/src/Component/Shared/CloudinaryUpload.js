import { openUploadWidget } from "../../utils/CloudinaryService";

const CloudinaryUpload = ({setUrl , setName}) => {
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "drjrc2d0c",
        uploadPreset: "gbmjlx3c",
        sources: ["local"]
      },
      function (error, result) {
        if (!error && result.event === "success") {
          setUrl(result.info.secure_url);
          setName(result.info.original_filename);
          console.log(result.info); //it return the info about the song if song is succesfully uploaded
        }else{
            if(error){
                console.log(error);
            }
        }

      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="text-black bg-white rounded-full py-2 px-4 font-semibold" onClick={uploadImageWidget}>
      Select Track
    </button>
  );
};

export default CloudinaryUpload;
