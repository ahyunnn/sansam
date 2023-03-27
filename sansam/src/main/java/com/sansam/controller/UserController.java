package com.sansam.controller;

import com.sansam.config.jwt.JwtProvider;
import com.sansam.data.entity.User;
import com.sansam.data.repository.UserRepository;
import com.sansam.dto.request.*;
import com.sansam.dto.response.EmailResponse;
import com.sansam.dto.response.FavoriteListResponse;
import com.sansam.dto.response.ReviewListResponse;
import com.sansam.dto.response.SignUpResponse;
import com.sansam.service.UserServiceImpl;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;


@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final JwtProvider jwtProvider;
    private final UserServiceImpl userService;
    private final UserRepository userRepository;

    @ApiOperation(
			value = "카카오 OAuth 회원가입",
			notes = "회원가입이 성공적으로 이루어지면 해당 회원의 accessToken과 refreshToken을 반환하고, 실패하면 Fail을 출력한다.")
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest) {
        try {
            userService.signUp(signUpRequest);
            User user = userRepository.findByUserNo(signUpRequest.getUserNo());

            String accessToken = jwtProvider.createAccessToken(user.getUserEmail());
            String refreshToken = jwtProvider.createRefreshToken(user.getUserEmail());
            userService.saveRefreshToken(refreshToken, user.getUserNo());

            SignUpResponse signUpResponse = new SignUpResponse();
            signUpResponse.setAccessToken(accessToken);
            signUpResponse.setRefreshToken(refreshToken);
            return new ResponseEntity<>(signUpResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
			value = "로그아웃",
			notes = "로그아웃 과정에서 refreshToken을 만료시키고 성공하면 Success를, 실패 시 Fail을 반환한다.")
    @PostMapping("/signout")
    public ResponseEntity<String> signOut(@RequestBody SignOutRequest signOutRequest) {
        try {
            userService.signOut(signOutRequest.getRefreshToken());
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
			value = "최초 회원가입 시 산 정보 저장",
			notes = "산 정보 저장이 성공적으로 이루어지면 Success를, 실패하면 Fail을 반환한다.")
    @PostMapping("/experience/insert")
    public ResponseEntity<?> saveExperience(@RequestHeader(value="X-ACCESS-TOKEN") String accessToken, HttpServletResponse response, @RequestBody SaveExperienceRequest saveExperienceRequest) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);
        User user = userRepository.findByUserEmail(userEmail);

        try {
            userService.saveExperience(user.getUserNo(), saveExperienceRequest);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
			value = "찜 목록",
			notes = "해당 유저의 찜 목록을 조회하고 성공하면 찜 목록을, 실패하면 Fail을 반환한다.")
    @GetMapping("/favorite")
    public ResponseEntity<?> getFavoriteList(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);

        try {
            FavoriteListResponse favoriteListResponse = userService.getFavoriteList(userEmail);
            return new ResponseEntity<>(favoriteListResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
            value = "찜 추가",
            notes = "해당 유저의 찜 목록에 코스를 추가하고, 성공하면 Success를, 실패하면 Fail을 반환한다.")
    @PostMapping("/favorite/insert")
    public ResponseEntity<?> saveFavorite(@RequestHeader(value="X-ACCESS-TOKEN") String accessToken, HttpServletResponse response, @RequestBody FavoriteRequest favoriteRequest) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);
        User user = userRepository.findByUserEmail(userEmail);

        try {
            userService.saveFavorite(user.getUserNo(), favoriteRequest);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
			value = "찜 목록에서 삭제",
			notes = "코스 번호에 해당하는 코스를 찜 목록에서 삭제하고, 성공하면 찜 목록을, 실패하면 Fail을 반환한다.")
    @DeleteMapping("/favorite/delete")
    public ResponseEntity<?> removeFavorite(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response, @RequestBody FavoriteRequest favoriteRequest) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);
        User user = userRepository.findByUserEmail(userEmail);

        try {
            userService.removeFavorite(user.getUserNo(), favoriteRequest);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
			value = "리뷰 목록",
			notes = "해당 유저의 리뷰 목록을 조회하고 성공하면 찜 목록을, 실패하면 Fail을 반환한다.")
    @GetMapping("/review")
    public ResponseEntity<?> getReviewList(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        System.out.println(response.getHeader("X-ACCESS-TOKEN"));

        String userEmail = jwtProvider.getEmailFromToken(accessToken);

        try {
            ReviewListResponse reviewListResponse = userService.getReviewList(userEmail);
            return new ResponseEntity<>(reviewListResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
            value = "리뷰 추가",
            notes = "해당 유저의 리뷰 목록에 리뷰를 추가하고, 성공하면 Success를, 실패하면 Fail을 반환한다.")
    @PostMapping("/review/insert")
    public ResponseEntity<?> saveReview(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response, @RequestBody SaveReviewRequest saveReviewRequest) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);
        User user = userRepository.findByUserEmail(userEmail);

        try {
            userService.saveReview(user.getUserNo(), saveReviewRequest);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
            value = "리뷰 수정",
            notes = "해당 유저의 해당 코스 리뷰를 수정하고, 성공하면 Success를, 실패하면 Fail을 반환한다.")
    @PutMapping("/review/update/{courseNo}")
    public ResponseEntity<String> updateReview(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response, @PathVariable int courseNo, @RequestBody UpdateReviewRequest updateReviewRequest) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);
        User user = userRepository.findByUserEmail(userEmail);

        try {
            userService.updateReview(user.getUserNo(), courseNo, updateReviewRequest);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
            value = "리뷰 삭제",
            notes = "해당 유저의 해당 코스 리뷰를 삭제하고, 성공하면 Success를, 실패하면 Fail을 반환한다.")
    @DeleteMapping("/review/delete/{courseNo}")
    public ResponseEntity<String> deleteReview(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response, @PathVariable int courseNo) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);
        User user = userRepository.findByUserEmail(userEmail);

        try {
            userService.deleteReview(user.getUserNo(), courseNo);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
            value = "Flask용 토큰 인증 및 이메일 반환 API",
            notes = "Flask에서 JWT 토큰 인증을 Spring Boot를 통해 진행하고, 진행 과정에서 accessToken의 변화를 헤더에 저장하여 반환하고, 유저의 이메일을 반환한다.")
    @GetMapping("/email")
    public ResponseEntity<EmailResponse> getEmail(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);
        EmailResponse emailResponse = new EmailResponse(userEmail);
        return new ResponseEntity<>(emailResponse, HttpStatus.OK);
    }
}
