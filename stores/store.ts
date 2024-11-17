import axios from "@/lib/axios";
import create, { StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";


type Page = {
  _id: string;
  pageImage: string;
  pageCoverImage: string;
  brandName: string;
  brandDescription: string;
  websiteUrl: string;
  componentType: string[]; // Array of component names
  industry: string[];      // Array of industry names
  stacks: string[];        // Array of stack names
  style: string[];         // Array of style names
  type: string[];          // Array of type names
  mode: "light" | "dark";  // Mode can be 'light' or 'dark'
  colorPalette: string[];  // Array of color hex codes
  createdAt: string;       // ISO string format
  updatedAt: string;       // ISO string format
  __v: number;             // Version key (usually for internal use)
  id: string; 
};

interface PagesResponse {
  data: Page[];
  status: boolean;
  statusCode: number;
  message: string;
  errors: null | string;
}

const initialPageData: Page = {
  _id: "",
  pageImage: "",
  pageCoverImage: "",
  brandName: "",
  brandDescription: "",
  websiteUrl: "",
  componentType: [],
  industry: [],
  stacks: [],
  style: [],
  type: [],
  mode: "light", // Default mode can be "light" or "dark"
  colorPalette: [],
  createdAt: "",
  updatedAt: "",
  __v: 0,
  id: "",
};

// type Metrics = {
//   users: any[];
//   components: any[];
//   industries: any[];
//   stacks: any[];
//   styles: any[];
//   types: any[];
// };
interface Metrics {
  [key: string]: {
      data: any[];  // Specify the type of data if known, for example, `data: MetricData[]`
  };
}

type StoreState = {
  loading: boolean;
  componentLoading: boolean;
  overlayLoading: boolean;
  token: string;
  link: string;
  metrics: Metrics;
  users: any[];
  components: any[];
  industries: any[];
  stacks: any[];
  styles: any[];
  types: any[];
  user: Record<string, any>;
  SingleData: Record<string, any>;
  isLogged: boolean;
  showLogin: boolean;
  showData: boolean;
  tags: string[];
  images: string[];
  page: PagesResponse;
  pages: {
    data: Page[];
    message: string;
    status: number;
    pagination: { total: number; page: number; pages: number };
  };
  error: string | null;  // Added error state
};

// Initial state setup
const initialState: StoreState = {
  loading: false,
  componentLoading: false,
  overlayLoading: false,
  token: "",
  link: "/pitch-decks",
  metrics: {
    users: {data: []},
    components: {data: []},
    industries:  {data: [ ]},
    stacks: {data: []},
    styles: {data: []},
    types: {data: []},
  },
  user: {},
  SingleData: {},
  isLogged: false,
  showLogin: false,
  showData: false,
  tags: [],
  images: [],
  pages: {
    data: [],
    message: "",
    status: 0,
    pagination: { total: 0, page: 0, pages: 0 },
  },
  page: {
    data: [initialPageData], // Start with an array containing the initial page data
    status: false,
    statusCode: 0,
    message: "",
    errors: null,
  },
  error: null,
  users: [],
  components: [],
  industries: [],
  stacks: [],
  styles: [],
  types: []
};

// Store interface defining state and actions
interface Store extends StoreState {
  fetchUsers: (token: string) => void;
  fetchComponents: (token: string) => void;
  fetchIndustries: (token: string) => void;
  fetchStacks: (token: string) => void;
  fetchTypes: (token: string) => void;
  fetchStyles: (token: string) => void;
  setToken: (token: string) => void;
  setShowLogin: (show: boolean) => void;
  setShowData: (show: boolean) => void;
  setIsLoggedin: (status: boolean) => void;
  setIsLoading: (status: boolean) => void;
  setIsComponentLoading: (status: boolean) => void;
  setIsOverlayLoading: (status: boolean) => void;
  setTags: (tags: string[]) => void;
  setImages: (images: string[]) => void;
  fetchAllPages: () => void;
  fetchSinglePage: (id: string) => void;
  fetchSingle: (id: string, type: string) => void;
  resetState: () => void;
  setError: (message: string) => void;  // Action to set error state
}

// Helper function for API requests
const fetchData = async (
  url: string,
  token: string,
  setState: any,
  stateKey: string
) => {
  try {
    setState({ overlayLoading: true });
    const response = await axios.get(url, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    setState((state: any) => ({
      ...state,
      metrics: { ...state.metrics, [stateKey]: response.data },
      overlayLoading: false,
    }));
    console.log(stateKey, response.data)
  } catch (error) {
    console.error(`Error fetching ${stateKey}:`, error);
    setState({ overlayLoading: false });
    setState({ error: `Error fetching ${stateKey}` });  // Set error state
  }
};

// Middleware for persistence
type StorePersist = (
  config: StateCreator<Store>,
  options: PersistOptions<Store>
) => StateCreator<Store>;

export const store = create<Store>(
  (persist as StorePersist)(
    (set, get) => ({
      ...initialState,

      resetState: () => set(() => initialState),

      setToken: (token) => set({ token }),
      setShowLogin: (show) => set({ showLogin: show }),
      setShowData: (show) => set({ showData: show }),
      setIsLoggedin: (status) => set({ isLogged: status }),
      setIsLoading: (status) => set({ loading: status }),
      setIsComponentLoading: (status) => set({ componentLoading: status }),
      setIsOverlayLoading: (status) => set({ overlayLoading: status }),
      setTags: (tags) => set({ tags }),
      setImages: (images) => set({ images }),
      setError: (message) => set({ error: message }),

      fetchUsers: (token: string) => fetchData("/user", token, set, "users"),
      fetchComponents: (token: string) => fetchData("/components", token, set, "components"),
      fetchIndustries: (token: string) => fetchData("/industry", token, set, "industries"),
      fetchStacks: (token: string) => fetchData("/stack", token, set, "stacks"),
      fetchTypes: (token: string) => fetchData("/type", token, set, "types"),
      fetchStyles: (token: string) => fetchData("/style", token, set, "styles"),

      fetchAllPages: async () => {
        // const token = () => get().token
        set({ overlayLoading: true });
        try {
          await axios
            .get(`/page`)
            .then(function (response) {
              set({ pages: response.data , overlayLoading: false });
              console.log(response.data)
            });
        } catch (error) {
          console.error("Error fetching Data:", error);
          set({ overlayLoading: false }); // Corrected from `loading: false`
      }
      },

      fetchSinglePage: async (title: string) => {
        console.log(title)
        set({ overlayLoading: true });
        try {
          await axios
            .get(`/page/name/${title}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${get().token}`,
              },
            })
            .then(function (response) {
              set({ page: response.data , overlayLoading: false });
              console.log(response.data)
            });
        } catch (error) {
          console.error("Error fetching Data:", error);
          set({ overlayLoading: false }); // Corrected from `loading: false`
      }
          },

      fetchSingle: async (id: string, type: string) => {
        // const token = () => get().token
        set({ overlayLoading: true });
        try {
          await axios
            .get(`/${type}/${id}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${get().token}`,
              },
            })
            .then(function (response) {
              set({ SingleData: response.data , overlayLoading: false });
              console.log(response.data)
            });
        } catch (error) {
          console.error("Error fetching Data:", error);
          set({ overlayLoading: false }); // Corrected from `loading: false`
      }
      },
    }),
    { name: "app-storage", getStorage: () => localStorage }
  )
);

