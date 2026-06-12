import { getAuthPath, getCookie } from "./auth_base/cookie_auth";

//Products
export async function fetchProducts(options: any = false) {
  const load: any = options ? JSON.stringify(options) : JSON.stringify({});
  const url = await getAuthPath("all_products");
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
      body: load,
    });
    if (!res.ok) {
      return { status: false, message: "Fetch Failed" };
    }
    const rs = await res.json();
    console.log(rs);
    return rs.data;
  } catch (error: any) {
    return { status: false, message: error.message };
  }
}

export async function fetchFeaturedProducts(options: any = false) {
  const load: any = options ? JSON.stringify(options) : JSON.stringify({});
  const url = await getAuthPath("all_featured_products");
  console.log("url::", url);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
      body: load,
    });
    if (!res.ok) {
      return { status: false, message: "Fetch Failed" };
    }
    const rs = await res.json();
    console.log(rs);
    return rs.data;
  } catch (error: any) {
    return { status: false, message: error.message };
  }
}

export async function fetchProductCategories() {
  const url = await getAuthPath("product_categories");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "force-cache",
  });
  const rs = await res.json();
  console.log(rs);
  if (!res.ok) {
    return { status: false, message: "Fetch Failed" };
  }
  return rs.data;
}

//articles_by_category
export async function fetchProductsByCategory(options: any = false) {
  const load: any = options ? JSON.stringify(options) : JSON.stringify({});
  const path = await getAuthPath("products_by_category");
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: load,
    cache: "no-store", //if you don't want to cache the request
  });
  const rs = await res.json();
  console.log(rs);
  if (!res.ok) {
    return { status: false, message: "Fetch Failed" };
  }
  return rs;
}

export async function fetchProductDetails(slug: string) {
  const url = await getAuthPath("product_details");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ slug: slug }),
    cache: "no-store", //if you don't want to cache the request
  });

  const rs = await res.json();
  console.log("sveer::", rs);
  if (!res.ok) {
    return { status: false, message: "Fetch Failed" };
  }
  return rs.data;
}


export async function fetchUserDetails(id: string) {
  const url = await getAuthPath("user_details");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ id: id }),
    cache: "no-store", //if you don't want to cache the request
  });

  const rs = await res.json();
  console.log("sveer::", rs);
  if (!res.ok) {
    return { status: false, message: "Fetch Failed" };
  }
  return rs.data;
}


export async function push_more_list(func: any, options: any) {
  return await func({
    offset: options.offset,
  });
}

//HTTP

export async function post(data: any, endpoint: string) {
  const url = await getAuthPath(endpoint);
  const access_token = await getCookie("access_token");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-cache", //if you don't want to cache the request
  });
  const rs = await res.json();
  console.log(rs);
  if (!res.ok) {
    return { status: false, message: "Post Failed" };
  }
  return rs;
}

export async function checkSession() {
  const path = await getAuthPath("checkSession");
  const access_token = await getCookie("access_token");
  const res = await fetch(path, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store", //if you don't want to cache the request
  });

  if (!res.ok) {
    return { status: false, message: "Post Failed" };
  }
  const rs = await res.json();
  return rs;
}
