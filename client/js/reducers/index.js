import messages from './messages';
import channels from './channels';
import activeChannel from './activeChannel';
import auth from './auth';
import typers from './typers';
import welcomePage from './welcomePage';
import userValidation from './userValidation';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  messages,
  channels,
  activeChannel,
  auth,
  typers,
  welcomePage,
  userValidation
});

export default rootReducer;
