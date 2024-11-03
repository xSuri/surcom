export const IP = '192.168.0.108';
export const API_URL = `http://${IP}:3000/api`;
export const SOCKET_URL = `ws://${IP}:4242`;
export const API_URLS = {
    'login': '/login',
    'register': '/register',
    'room': '/room',
    'room:sendNewImage': '/room/sendNewImage',
    'room:getImageViews': '/room/getImageViews',
    'user:getInfoAboutUser': '/user/getInfoAboutUser',
};
export const STATUTES = {
    'success': 200,
    'text:room:not:found': 'Could not found room',
    'text:room:success': 'Success',
};
export const STORAGES = {
    'rooms': 'rooms',
};
export const SCREEN_ROUTES = {
    'screen:panel:authentication': 'LoginAndRegister',
    'screen:panel:login': 'Login',
    'screen:panel:register': 'Register',
    'screen:home': 'Home',
    'screen:chat:global': 'GlobalChat',
};
export const NUMBERS = {
    'image:max:views': 3,
};
export const ROLES = {
    'admin': 'admin',
};
export const TEXTS = {
    'text:add:room:input:room:name': 'Write Your Room Name',
    'text:add:room:input:room:pin': 'Write Your Room PIN',
    'text:add:room:button:room:title': 'Create / Auth',
    'text:image:send:message': 'Message to Image:',
    'text:image:send:max:views': 'Max Views Image:',
    'text:image:input:write:message': 'Write Your Message',
    'text:image:input:max:views': 'Write Max Views',
    'text:settings:role:title': 'Update My Role',
    'text:settings:text:name': 'Name:',
    'text:settings:text:role': 'Role:',
    'text:settings:text:role:loading': 'Loading...',
    'text:user:info:text:name': 'Name:',
    'text:user:info:text:role': 'Role:',
    'text:user:info:text:role:loading': 'Loading...',
    'text:user:info:admin:text:panel': 'ADMIN PANEL',
};
export const ALERTS_TEXTS = {
    'alert:text:add:room:not:found:success:title': 'New Room',
    'alert:text:add:room:not:found:success:body': 'New Room Successfully Added',
    'alert:text:add:room::not:found:error:title': 'Error!',
    'alert:text:add:room::not:found:error:body': 'Something went wrong! (Please try again later)',
    'alert:text:add:room::success:auth:title': 'Authenticated',
    'alert:text:add:room::success:auth:body': 'Success authed to room!',
    'alert:text:add:room::error:title': 'Error!',
    'alert:text:add:room::network:error:title': 'Error!',
    'alert:text:add:room::network:error:body': 'Something went wrong! (Please try again later -> Network Problem)',
    'alert:text:image:send:success:title': 'Image Added!',
    'alert:text:image:send:success:body': 'Your image has been sent. Click now on yours room!',
};