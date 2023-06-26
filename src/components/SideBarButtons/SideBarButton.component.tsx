import CustomButton from '../CustomButton/CustomButton.component';

const SideBarButton = ({ icon, text, onClick }: {
    icon: React.ReactElement;
    text: React.ReactElement | string;
    onClick?: () => void;
}) => {
  return (
    <CustomButton flat width="226px" onClick={onClick}>
      <div style={{ width: '16px', height: '20px', marginRight: '12px' }}>
        {icon}
      </div>
      {text}
    </CustomButton>
  );
};

export default SideBarButton;
