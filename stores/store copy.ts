import axios from "@/lib/axios";
import { create } from "zustand";

type pitch = {
  pitchdeck: any;
  name: string;
  coverImage: any;
  "_id":string,
"title":string,
"coverImageUrl":string,
"about":string,
"tag":string,
"amountRaised":string,
"contentImagesUrls":string[],
"pdfFileUrl":string,
"createdAt":string,
"updatedAt":string,
"__v": number}

type template = {"_id":string,
"name":string,
"templateCoverImageUrl":string,
"about":string,
"numberOfPages":number,
"cost":string,
"templateImagesUrl":string[],
"linkToPurchase":string,
"deliverables":string[],
"createdAt":string,
"updatedAt":string,
"__v": number}

type statistics = {
'totalPitches': number,
'totalNumberOfTermsAndConditionsGenerated': number,
'totalNumberOfEmailUsers': number,
'totalNumberOfGoogleUsers': number,
'totalNumberOfPitchdecks': number,
'totalNumberOfTemplates': number,
'totalNumberOfUsers': number,
'totalNumberOfPrivacyPolicyGenerated': number,
'listOfRegisteredUsers': [],
'listOfPrivacyPolicyAddress': [],
'listOfTermsAndCondsEmailAddress': [],
}

type StoreState = {
  loading: boolean;
  componentLoading: boolean;
  overlayLoading: boolean;
  token: string;
  link: string;
  users: [];
  user: {}
  isLogged: boolean,
  showLogin: boolean,
  showData: boolean,
  tags: [],
  images: [],
  pitch: pitch,
  pitches: pitch[],
  templates: template[],
  template: template,
data: statistics

};

const initialState: StoreState = {
  loading: false,
  token: "",
  link: `/pitch-decks`,
  users: [],
  user: {},
  isLogged: false,
  showLogin: false,
  showData: false,
  tags: [],
  images: [],
  pitch: {
    "_id": "",
    "title": "",
    "coverImageUrl": "",
    "about": "",
    "tag": "",
    "amountRaised": "",
    "contentImagesUrls": [],
    "pdfFileUrl": "",
    "createdAt": "",
    "updatedAt": "",
    "__v": 0,
    pitchdeck: undefined,
    name: "",
    coverImage: undefined
  },
  pitches: [],
  templates: [],
  componentLoading: false,
  template: {
    _id: "",
    name: "",
    templateCoverImageUrl: "",
    about: "",
    numberOfPages: 0,
    cost: "",
    templateImagesUrl: [],
    linkToPurchase: "",
    deliverables: [],
    createdAt: "",
    updatedAt: "",
    __v: 0
  },
  data: {
    totalPitches: 0,
    totalNumberOfEmailUsers: 0,
    totalNumberOfGoogleUsers: 0,
    totalNumberOfPitchdecks: 0,
    totalNumberOfTemplates: 0,
    totalNumberOfUsers: 0,
    totalNumberOfTermsAndConditionsGenerated: 0,

    listOfRegisteredUsers: [],
    totalNumberOfPrivacyPolicyGenerated: 0,
    listOfPrivacyPolicyAddress: [],
    listOfTermsAndCondsEmailAddress: []
  },
  overlayLoading: false
};

interface Store extends StoreState {
  setUser: (user: {}) => void;
  setlink: (link: "") => void;
  setTags: (tags: []) => void;
  setImages: (images: []) => void;
  setToken: (token: string) => void;
  setShowLogin: (show: boolean) => void;
  setShowData: (show: boolean) => void;
  setIsLoggedin: (status: boolean) => void;
  setIsLoading: (status: boolean) => void;
  setIsComponentLoading: (status: boolean) => void;
  setIsOverlayLoading: (status: boolean) => void;
  fetchSinglePitch: (id: string) => void;
  fetchSingleTemplate: (id: string) => void;
  fetchPitches: (pitches: pitch[]) => void;
  fetchTemplates: (templates: template[]) => void;
  fetchData: (token: string) => void;

  // fetchPitches: () => void;
  resetState: () => void;
}

export const store = create<Store>((set, get) => ({
  ...initialState,

  resetState: () => set(initialState),

  setToken: (token: any) => {
    console.log(token)
    set((_state: any) => ({ token: token }));
  },
  setShowLogin: (show: any) => {
    set((state: any) => ({ showLogin: show }));
  },
  setShowData: (show: any) => {
    set((state: any) => ({ showData: show }));
  },
  setIsLoggedin: (status: any) => {
    set((state: any) => ({ isLogged: status }));
  },
  setIsLoading: (status: any) => {
    set((state: any) => ({ loading: status }));
  },
  setlink: (link: any) => {
    set((state: any) => ({ link: link }));
  },

  setIsComponentLoading: (status: any) => {
    set((state: any) => ({ componentLoading: status }));
  },

  setIsOverlayLoading: (status: any) => {
    set((state: any) => ({ overlayLoading: status }));
  },
  setUser: (user: any) => {
    set((state: any) => ({ user: user }));
  },

  // Temporary Use
  setTags: (tags: any) => {
    set((state: any) => ({ tags: tags }));
  },
  setImages: (images: any) => {
    set((state: any) => ({ images: images }));
  },

  fetchTemplates: (response: any) => {
    set((state: any) => ({ templates: response, loading: false }));
  },

  fetchPitches: (response: any) => {
    set((state: any) => ({ pitches: response, loading: false }));
  },
  // fetchSinglePitch: (response: any) => {  set((state: any) => ({ pitch: response, loading: false }))},

  fetchSinglePitch: async (title: string) => {
// const url = title.split('/').pop();
const url = title;
    set({ loading: true });
    try {
      await axios
        .get(`/pitchdeck/${url}`)

        .then(function (response) {
          set({ pitch: response.data.pitchdeck, loading: false });
          console.log(response.data.pitchdeck)

        });
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },

  fetchData: async () => {
   const token = () => get().token
    set({ componentLoading: true });
    try {
      await axios
        .get(`/metrics/statistics`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          set({ data: response.data , componentLoading: false });
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ componentLoading: false }); // Corrected from `loading: false`
  }
  },

  fetchSingleTemplate: async (title: string) => {
    set({ loading: true });
    try {
      // await axios.get(`/templates/template/${title}`).then(function (response) {
      await axios
        .get(`/templates/search?name=${title}`)
        .then(function (response) {
          set({ template: response.data[0], loading: false });
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },
}));

// function then(arg0: (res: any) => void) {
//   throw new Error("Function not implemented.");
// }
