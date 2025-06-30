import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  Project,
  ProjectCreateRequest,
  User,
  UserCreateRequest,
} from "./schema";
import { BackendHost } from "@/configs/backend-host";

type FetchError = {
  message: string;
  info?: unknown;
  status?: number;
};

const disableRevalidateOption = {
  revalidate: false,
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 0, // データの重複を防ぐための間隔を0に設定
  focusThrottleInterval: 0, // フォーカス時の再検証を無効化
  refreshInterval: 0, // 定期的な更新を無効化
  refreshWhenHidden: false, // 非表示時の更新を無効化
  refreshWhenOffline: false, // オフライン時の更新を無効化
  keepPreviousData: false, // 前のデータを保持しない
  loadingTimeout: 0, // ローディングタイムアウトを無効化
  errorRetryCount: 0, // エラー時の再試行回数を0に設定
  errorRetryInterval: 0, // エラー時の再試行間隔を0に設定
  loadingTimeoutError: false, // ローディングタイムアウトエラーを無効化
  shouldRetryOnError: false, // エラー時の再試行を無効化
};

// 基本的なフェッチャー関数
// JSONを返すAPIを想定
const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    const error: FetchError = new Error(
      "An error occurred while fetching the data."
    );
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

const postRequest = async <Arg, Data>(
  url: string,
  arg: { arg: Arg }
): Promise<Data> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg.arg),
  });
  if (!res.ok) {
    const error: FetchError = new Error(
      "An error occurred while posting the data."
    );
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json() as Promise<Data>;
};

// SWRを使ったカスタムフック
// data: 取得したデータ
// error: エラーオブジェクト
// isLoading: データ取得中かどうか
export const useApiData = <T>(host: string, path: string | null) => {
  return useSWR<T>(`${host}${path}`, fetcher);
};

// ヘルスチェック
export const useHealthCheck = (host: string, interval: number = 5) => {
  return useSWR(`${host}/`, fetcher, {
    refreshInterval: interval * 1000, // ミリ秒単位に変換
    revalidateOnFocus: false, // フォーカス時の再検証を無効化
  });
};

// ユーザログインを試し，アカウントがなければ作成する
export const useSignIn = (host?: BackendHost) => {
  return useSWRMutation<User, unknown, string | null, UserCreateRequest>(
    host ? `http://${host.host}:${host.port}/user/auth/email` : null,
    postRequest,
    disableRevalidateOption
  );
};

// プロジェクトを作成する
export const useCreateProject = (host?: BackendHost) => {
  return useSWRMutation<Project, unknown, string | null, ProjectCreateRequest>(
    host ? `http://${host.host}:${host.port}/project/create` : null,
    postRequest,
    disableRevalidateOption
  );
};
