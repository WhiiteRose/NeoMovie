import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';

const ProtectedPage = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      dispatch(setAuthModalOpen(true));
      navigate('/');
    }
  }, [user, dispatch, navigate]);

  return user ? children : null;
};

export default ProtectedPage;
