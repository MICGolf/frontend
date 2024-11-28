import BannerDataList from './components/BannerDataList';
import AddBannerOrPromotion from './components/AddBannerOrPromotion';
import { useState } from 'react';
import { Banner } from './type';

const BannerPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState<Banner | null>(null);

  const handleEdit = (data: Banner) => {
    setIsEditing(true);
    setEditingData(data);
  };

  const handleEditSubmit = () => {
    setIsEditing(false);
    setEditingData(null);
  };

  return (
    <>
      <AddBannerOrPromotion
        location='banner'
        isEditing={isEditing}
        editingData={editingData}
        onEditSubmit={handleEditSubmit}
      />
      <BannerDataList onEdit={handleEdit} />
    </>
  );
};

export default BannerPage;
