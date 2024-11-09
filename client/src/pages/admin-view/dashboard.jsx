import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductImageUpload from "@/components/admin-view/image-upload";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  function handleDeleteFeatureImage(imageId) {
    dispatch(deleteFeatureImage(imageId))
      .then(() => {
        dispatch(getFeatureImages());
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        isEditMode={false}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((featureImgItem, index) => (
            <div className="relative" key={featureImgItem._id || index}>
              <img
                src={featureImgItem.image}
                className="w-full h-[300px] object-cover rounded-t-lg"
                alt={`feature ${index}`}
              />
              <Button
  onClick={() => {
    const imageId = featureImgItem._id; 
    if (!imageId) {
      console.error("No ID provided for deletion."); 
      return;
    }
    console.log("Deleting image with ID:", imageId);
    handleDeleteFeatureImage(imageId);
  }}
  className="mt-2 w-'50%' bg-red-500 text-white"
>
  Delete
</Button>

            </div>
          ))
        ) : (
          <div>No feature images available.</div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
