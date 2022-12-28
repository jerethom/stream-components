export type TwitchRedirectQueryParams = {
  code: string;
  scope: string;
  state: string;
  error?: string;
  error_description?: string;
};

export type TwitchOAuth2TokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string[];
  token_type: string;
};

export type TwitchHelixUsersResponse = {
  data: {
    id: string;
    login: string;
    display_name: string;
    type: string;
    broadcaster_type: string;
    description: string;
    profile_image_url: string;
    offline_image_url: string;
    view_count: number;
    email: string;
    created_at: string;
  }[];
};
