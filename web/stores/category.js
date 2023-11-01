import { defineStore } from 'pinia';
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';

export const useCategoryStore = defineStore('category', () => {
  const config = useRuntimeConfig();

  const { token } = useAuth();
  const headers = {
    Authorization: token.value,
    'Content-Type': 'application/json;charset=UTF-8',
  };

  const alovaInstance = createAlova({
    baseURL: config.public.apiUrl,
    requestAdapter: GlobalFetch(),
    responded: {
      onSuccess: async (response) => {
        const json = await response.json();
        if (response.status !== 200) throw new Error(json.message);
        return json;
      },
    },
  });

  const items = ref([]);
  const tree = ref([]);

  async function getAll() {
    const res = await alovaInstance.Get('/api/category', { headers }).send();
    this.items = res;

    return res;
  }

  async function getTree() {
    const res = await alovaInstance.Get('/api/category/tree', { headers }).send();
    this.tree = res;

    return res;
  }

  async function create(body) {
    const res = await alovaInstance.Post('/api/category/', body, { headers }).send();
    this.items.push(res);

    return res;
  }

  async function update(body) {
    const res = await alovaInstance.Put(`/api/category/${body._id}`, body, { headers }).send();
    const index = this.items.findIndex((v) => v._id === res._id);
    Object.assign(this.items[index], res);

    return res;
  }

  async function remove(body) {
    console.log(body)
    const res = await alovaInstance.Delete(`/api/category/${id}`, body , { headers }).send();
    const index = this.items.findIndex((v) => v._id === res.id);
    this.items.splice(index, 1);

    return res;
  }

  return {
    items, tree, getAll, getTree, create, update, remove,
  };
});