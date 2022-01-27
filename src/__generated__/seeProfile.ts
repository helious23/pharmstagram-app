/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeProfile
// ====================================================

export interface seeProfile_seeProfile_following {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
}

export interface seeProfile_seeProfile_followers {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
}

export interface seeProfile_seeProfile_photos_results {
  __typename: "Photo";
  id: number;
  file: string;
}

export interface seeProfile_seeProfile_photos {
  __typename: "MyPhotosResults";
  results: (seeProfile_seeProfile_photos_results | null)[] | null;
  totalPages: number | null;
}

export interface seeProfile_seeProfile {
  __typename: "User";
  id: number;
  firstName: string;
  username: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  following: (seeProfile_seeProfile_following | null)[] | null;
  followers: (seeProfile_seeProfile_followers | null)[] | null;
  totalFollowing: number;
  totalFollowers: number;
  totalPosts: number;
  photos: seeProfile_seeProfile_photos;
}

export interface seeProfile {
  seeProfile: seeProfile_seeProfile | null;
}

export interface seeProfileVariables {
  username: string;
  page: number;
}
