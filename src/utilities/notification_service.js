import http from './http-common';
import { useDispatch, useSelector } from 'react-redux';
import {updatenotificationCount,updateStatus} from "../store/notificationSlice"
import * as helper from '../helpers/HelperFuncs';

const NotificationService = () => {
  const dispatch = useDispatch();
  const storeInfo = useSelector(state => state);

  const getAllNotifications = async () => {
    try {
      console.log('%c Fetching all my notifications --> ', 'color:orange');
      const response = await http.get('/group/all');
      return response.data;
    } catch (err) {
      helper.checkError(err);
    }
  };

  return {
    getAllNotifications,
  };
};

export default NotificationService;
