import { Link } from 'react-router-dom';
import CustomButton from '../CustomButton/CustomButton.component';

function SideBarButton({
  icon, text, active, to,
}: {
  icon: React.ReactElement;
  text: React.ReactElement | string;
  active?: boolean;
  to: string;
}) {
  return (
    <Link to={to}>
      <CustomButton flat width="226px" active={active}>
        <div style={{ width: '16px', height: '20px', marginRight: '12px' }}>
          {icon}
        </div>
        {text}
      </CustomButton>
    </Link>
  );
}

export default SideBarButton;
