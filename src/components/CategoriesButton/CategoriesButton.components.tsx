import { Link } from 'react-router-dom';
import CustomButton from '../CustomButton/CustomButton.component';
import CustomIconButton from '../CustomIconButton/CustomIconButton.component';

function CategoriesButton({
  title,
  active,
  count,
  to,
}: {
  title: React.ReactElement | string;
  count: number;
  active?: boolean;
  to: string;
}) {
  const buttonTitle = title.toString().length > 18 ? `${title.toString().substring(0, 18)}...` : title;
  return (
    <Link to={to}>
      <CustomButton
        flat
        active={active}
        width="226px"
        rightIcon={(
          <CustomIconButton
            iconText={count.toString()}
            active={active}
            size="xs"
            flat={!active}
            dark={!active}
            backgroundColour={!active ? 'var(--light-overlay-color)' : undefined}
          />
        )}
      >
        {buttonTitle}
      </CustomButton>
    </Link>
  );
}

export default CategoriesButton;
