package com.sansam.service;

import com.sansam.dto.request.*;
import com.sansam.dto.response.FavoriteListResponse;
import com.sansam.dto.response.ReviewListResponse;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    void signUp(SignUpRequest signUpRequest);
    void saveRefreshToken(String refreshToken, int userNo);
    void signOut(String refreshToken);
    FavoriteListResponse getFavoriteList(String userEmail);
    void saveFavorite(int userNo, FavoriteRequest favoriteRequest);
    void removeFavorite(int userNo, FavoriteRequest favoriteRequest);
    ReviewListResponse getReviewList(String userEmail);
    void saveReview(int userNo, SaveReviewRequest saveReviewRequest);
    void updateReview(int userNo, int courseNo, UpdateReviewRequest updateReviewRequest);
    void deleteReview(int userNo, int courseNo);
}
