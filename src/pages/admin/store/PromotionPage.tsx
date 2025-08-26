import { useState } from 'react';
import AddBannerOrPromotion from './components/AddBannerOrPromotion';
import PromotionDataList from './components/PromotionDataList';
import { Banner } from './type';

const PromotionPage = () => {
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
      <PromotionDataList onEdit={handleEdit} />
    </>
  );
};

export default PromotionPage;
