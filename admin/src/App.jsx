import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnnouncementBar from './Pages/AnnouncementBar';
import CreateAccount from './Pages/CreateAccount';
import CustomerSegmentsList from './Pages/CustomerSegmentsList';
import Layout from './Components/Layout';
import FilledState from './Pages/FilledState';
import Login from './Pages/Login';
import OrderList from './Pages/OrderList';
import PurchaseOrder from './Pages/PurchaseOrder';
import ProtectedRoute from './Pages/ProtectedRoute'; // Adjust the path as needed
import ProductList from './Pages/ProductsList';
import ContactSegmentsList from './Pages/ContactSegmentsList';
import CategorySegmentsList from './Pages/CategorySegmentsList';
import SubCategorySegmentsList from './Pages/SubCategorySegmentsList';
import PurposeSegmentsList from './Pages/PurposeSegmentsList';
import FestivalSegmentsList from './Pages/FestivalSegmentsList';
import ThemeSegmentsList from './Pages/ThemeSegmentsList';
import SizesSegmentsList from './Pages/SizesSegmentsList';
import MaterialSegmentsList from './Pages/MaterialSegmentsList';
import GemStoneSegmentsList from './Pages/GemStoneSegmentsList';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route for Login */}
        <Route path="/login" element={<Login />} />

        {/* All routes inside this ProtectedRoute require authentication */}
        <Route element={<ProtectedRoute />}>
          {/* Optionally wrap these routes with a layout */}
          {/* <Route element={<Layout />}> */}
          <Route path="/" element={<CustomerSegmentsList />} />
          <Route path="/contacts" element={<ContactSegmentsList />} />
          <Route path="/categorys" element={<CategorySegmentsList />} />
          <Route path="/subcategorys" element={<SubCategorySegmentsList />} />
          {/*  */}
          <Route path="/purpose" element={<PurposeSegmentsList />} />
          <Route path="/festival" element={<FestivalSegmentsList />} />
          <Route path="/theme" element={<ThemeSegmentsList />} />
          <Route path="/sizes" element={<SizesSegmentsList />} />
          <Route path="/material" element={<MaterialSegmentsList />} />
          <Route path="/gemstone" element={<GemStoneSegmentsList />} />
          {/*  */}
          <Route path="/orders" element={<OrderList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/purchase-order" element={<PurchaseOrder />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/announcement" element={<AnnouncementBar />} />
          <Route path="/filled-state" element={<FilledState />} />
        </Route>
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
