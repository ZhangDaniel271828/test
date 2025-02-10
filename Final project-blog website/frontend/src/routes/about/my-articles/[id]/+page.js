import { browser } from "$app/environment";
import { page } from "$app/stores";
import { ARTICLES_URL } from "$lib/js/api-urls.js";
import { goto } from "$app/navigation";

export async function load({ parent, params }) {
  if (!browser) return;
  const { user, isLoggedIn } = await parent();
 

  const articleId = params.id; // 获取文章 ID
  
  try {
    const res = await fetch(`${ARTICLES_URL}/${articleId}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch article: ${res.statusText}`);
    }
    const article = await res.json(); // 解析 JSON 数据
    return {
      article, // 返回文章数据
      isLoggedIn,
      user
    };
    } catch (error) {
      console.error("Error fetching article:", error);
      return {
        article: null, // 发生错误时返回空数据
        error: error.message
      };
    }
}
