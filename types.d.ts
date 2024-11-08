
type FormData = {
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
  colorPalette: string[];
}
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

  interface PagesProps {
    data: any;
    pages: {
      data: page[];
      message: string;
      status: number;
      pagination: {
        total: number;
        page: number;
        pages: number;
      };
    };
  }

  // interface page {
  //   pageName: string;
  //   pageNumber: number;
  //   pageType: string;
  //   pageUrl: string;
  //   _id: string;
  // }
  
  interface pages {
    [pageType: string]: page;
  }