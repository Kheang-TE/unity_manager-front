import useUserStore from '@/store/user.store';

export default () => {
  const userStore = useUserStore();
  userStore.logout();
  window.location.href = '/signin';
};
