import { Divider, Text } from '@chakra-ui/react';
import {
  AddIcon, EditIcon, RepeatClockIcon, StarIcon,
} from '@chakra-ui/icons';
import {
  Routes, Route, useLocation, useNavigate,
} from 'react-router-dom';
import { useContext, useEffect } from 'react';
import TitleBar from '../../components/TitleBar/TitleBar.component';
import { Logo } from '../../components/Icons/PromptClipLogo';
import SideBarButton from '../../components/SideBarButtons/SideBarButton.component';
import { HeartIcon } from '../../components/Icons/HeartIcon';
import CustomButton from '../../components/CustomButton/CustomButton.component';
import DisplayPrompts from './routes/DisplayPrompts/DisplayPrompts';
import AddPrompt from './routes/AddPrompt/AddPrompt.component';
import AddCategory from './routes/AddCategory/AddCategory.component';
import { getCategories, getPrompts } from '../../utils/database';
import { UpdateContext } from '../../contexts/update.context';
import { PromptsContext } from '../../contexts/prompts.context';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoriesButton from '../../components/CategoriesButton/CategoriesButton.components';
import CustomIconButton from '../../components/CustomIconButton/CustomIconButton.component';

const routes = {
  allPrompts: '/dashboard',
  addPrompt: '/dashboard/add-prompt',
  favorites: '/dashboard/favorites',
  recentUsed: '/dashboard/recent-used',
  mostUsed: '/dashboard/most-used',
  addCategory: '/dashboard/add-category',
};

function Dashboard() {
  const { prompts, setPrompts } = useContext(PromptsContext);
  const { shouldUpdate } = useContext(UpdateContext);
  const { categories, setCategories } = useContext(CategoriesContext);

  useEffect(() => {
    (async () => {
      setPrompts(await getPrompts('dateCreated'));
      setCategories(await getCategories());
    })();
  }, [shouldUpdate]);

  const location = useLocation();
  const nav = useNavigate();
  return (
    <div className="dashboardWindow">
      <div className="leftSideBar">
        <TitleBar />
        <Logo className="logo" />
        <div className="sidebarOptionsHeader">
          <Text color="#787C83">Prompt</Text>
          <CustomIconButton
            iconText="+"
            size="xs"
            dark
            flat
            onClick={() => {
              nav(routes.addPrompt);
            }}
          />
        </div>
        <div className="sidebarOptions">
          <SideBarButton
            icon={<EditIcon />}
            to={routes.allPrompts}
            active={location.pathname === routes.allPrompts}
            text="All Prompts"
          />
          <SideBarButton
            icon={<HeartIcon />}
            to={routes.favorites}
            active={location.pathname === routes.favorites}
            text="Favorites"
          />
          <SideBarButton
            icon={<RepeatClockIcon />}
            to={routes.recentUsed}
            active={location.pathname === routes.recentUsed}
            text="Recent used"
          />
          <SideBarButton
            icon={<StarIcon />}
            to={routes.mostUsed}
            active={location.pathname === routes.mostUsed}
            text="Most used"
          />
        </div>
        <div className="sidebarOptionsHeader">
          <Text color="#787C83">Categories</Text>
          <CustomIconButton
            iconText="+"
            size="xs"
            dark
            flat
            onClick={() => {
              nav(routes.addCategory);
            }}
          />
        </div>
        <div className="sidebarOptions">
          <div style={{ overflowY: 'auto', maxHeight: '340px' }}>
            {categories.map((category) => (
              <CategoriesButton
                key={category.uuid}
                title={category.name}
                count={category.promptsCount}
                to={`/dashboard/${category.name}`}
                active={location.pathname === `/dashboard/${category.name}`}
              />
            ))}
          </div>
        </div>
      </div>
      <Divider
        borderColor="rgba(255,255,255, 0.1)"
        marginTop="5px"
        marginBottom="10px"
        marginLeft={0}
        orientation="vertical"
      />
      <div className="rightWindow">
        <div className="topStatusBar">
          <div>
            <Text fontWeight="bold" fontSize="14px">
              Welcome back
            </Text>
            <Text color="rgba(255,255,255, 0.7)" fontSize="11px">
              Manage all your AI prompts in one place
            </Text>
          </div>
          <CustomButton
            leftIcon={<AddIcon />}
            onClick={() => {
              nav(routes.addPrompt);
            }}
          >
            Add New
          </CustomButton>
        </div>
        <Divider
          borderColor="rgba(255,255,255, 0.1)"
          marginTop="20px"
          marginBottom="24px"
          marginLeft={0}
          orientation="horizontal"
          style={{
            position: 'relative',
            left: '-32px',
            width: 'calc(100% + 64px)',
          }}
        />
        <div>
          <Routes>
            <Route
              path="/"
              element={(
                <DisplayPrompts
                  prompts={prompts}
                  setPrompts={setPrompts}
                  filterOption="DateCreated"
                />
              )}
            />
            <Route path="/add-prompt" element={<AddPrompt />} />
            <Route
              path="/favorites"
              element={(
                <DisplayPrompts
                  prompts={prompts}
                  setPrompts={setPrompts}
                  filterOption="Favorites"
                />
              )}
            />
            <Route
              path="/recent-used"
              element={(
                <DisplayPrompts
                  prompts={prompts}
                  setPrompts={setPrompts}
                  filterOption="RecentlyUsed"
                />
              )}
            />
            <Route
              path="/most-used"
              element={
                <DisplayPrompts prompts={prompts} setPrompts={setPrompts} filterOption="MostUsed" />
              }
            />
            <Route path="/add-category" element={<AddCategory />} />
            {categories.map((category) => (
              <Route
                key={category.uuid}
                path={`/${category.name}`}
                element={(
                  <DisplayPrompts
                    prompts={prompts}
                    setPrompts={setPrompts}
                    filterOption={category}
                  />
                )}
              />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
