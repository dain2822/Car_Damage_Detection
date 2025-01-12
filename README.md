[Download the model here](https://github.com/username/repo/releases/download/v1.0/car_damage_detection_model.h5)
모델 용량이 커서 업로드가 안 돼서 릴리즈로 링크 걸어둡니다.
# VehiScan

## 차량 파손 검수 어플리케이션

### 프로젝트 개요
**VehiScan**은 딥러닝 기술을 활용하여 차량 외관 파손 여부를 자동으로 검수하는 애플리케이션입니다. 차량 대여 업체, 중고차 거래 플랫폼, 보험사를 주요 타겟으로 하여, 육안 검수의 비효율성과 주관적 판단 문제를 해결하고, 효율성과 신뢰성을 개선하는 것을 목표로 합니다.

---

### 1. 개발 배경 및 목표
#### 개발 배경
- **차량 외관 검수의 필요성**: 차량 대여업체, 중고차 거래 플랫폼, 보험사 등에서 차량 외관 검수가 필수적임.
- **인력의 한계**: 
  - 육안 검수로 인한 시간 및 인적 자원의 낭비.
  - 주관적 판단으로 인해 정확도 문제 발생.
  - 대규모 차량 검수 시 비효율성이 심화되고, 사용자의 신뢰도 저하.

#### 개발 목표
- **효율성 향상**: 딥러닝 모델로 시간과 인력을 절감.
- **정확성 및 신뢰성 개선**: 주관적 판단 배제, 실시간 데이터 처리 가능.
- **실시간 검수 지원**: 대규모 데이터 처리 모델 개발.

---

### 2. 내용 및 기능
#### 프로젝트 내용
- 이진 분류 모델을 사용하여 차량 이미지를 `파손`과 `비파손`으로 자동 분류.
- **ResNet 기반 CNN 모델**로 새로운 이미지에서 파손 상태 예측.
- **실시간 검수 시스템** 구현.

#### 타겟 사용자
- 차량 대여 업체 또는 고객.
- 중고차 거래 플랫폼.
- 보험사.

#### 기술 스택
- **Frontend**: React Native, Expo, JavaScript.
- **Backend**: Python, Flask (API 및 모델 서빙).
- **Deep Learning**: TensorFlow (모델 개발 및 학습).
- **Tools**: GitHub, Visual Studio Code, os, NumPy.

---

### 3. 개발 과정
#### 사용 모델
- **CNN (Convolutional Neural Network)**:
  - 이미지 데이터의 공간적 패턴(가장자리, 텍스처, 객체)을 효과적으로 학습.
  - 합성곱 계층과 풀링 계층을 통해 연산량 감소 및 일반화 성능 향상.
  - Sigmoid 활성화 함수를 통해 `파손 여부`를 0~1 사이 값으로 출력.

#### 데이터 수집 및 전처리
- **데이터 수집**: 차량 외관 이미지 5000장 라벨링 (파손/비파손).
- **전처리**:
  - ImageDataGenerator를 사용해 데이터 증강 (rescale, rotation, zoom, flip 등).

#### 어려움 해결
- **프론트엔드와 백엔드 연결 문제**: HTTP 요청 처리 및 데이터 형식 불일치 해결.
- **CORS 정책 문제**: 클라이언트-서버 간 요청 차단 문제 해결.
- **경로 설정 문제**: Flask 서버 URL 설정 오류 수정.

---

### 4. 프로토타입 및 성능 평가
- **Flow Chart**: 이미지 업로드 -> 모델 분석 -> 결과 반환.
- **성능 평가**: F1 Score 기준 성능 측정.

---

### 5. 개선 사항 및 향후 계획
1. **파손 유형 상세화**:
   - 긁힘, 찍힘, 이격 등 세부 유형 탐지 기능 추가.
2. **모델 경량화 및 개선**:
   - 모바일 환경에서도 원활히 작동하도록 속도 최적화.
3. **시간대 저장 기능**:
   - 촬영 시각 정보를 이미지에 포함하여 데이터 신뢰성 향상.
4. **부위별 사진 저장 형식**:
   - 앞, 뒤, 옆 등 각 부위별 사진 촬영 형식 지정.
5. **부가 기능 추가**:
   - 차량 대여: 대여 및 반납 신청 기능.
   - 중고차 거래: 차량 외관 상태 기반 가격 예측 기능.
   - 보험사: 파손 상태에 따른 보상액 자동 산출 기능.

---

### 프로젝트 팀
- **강동우**: rkdehddn2007@gmail.com
- **강민찬**: why990928@gmail.com
- **심다인**: dain2822@gmail.com

---
![슬라이드_1](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C1.PNG)
![슬라이드 2](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C2.PNG)
![슬라이드 3](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C3.PNG)
![슬라이드 4](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C4.PNG)
![슬라이드 5](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C5.PNG)
![슬라이드 6](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C6.PNG)
![슬라이드 7](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C7.PNG)
![슬라이드 8](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C8.PNG)
![슬라이드 9](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C9.PNG)
![슬라이드 10](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C10.PNG)
![슬라이드 11](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C11.PNG)
![슬라이드 12](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C12.PNG)
![슬라이드 13](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C13.PNG)
![슬라이드 14](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C14.PNG)
![슬라이드 15](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C15.PNG)
![슬라이드 16](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C16.PNG)
![슬라이드 17](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C17.PNG)
![슬라이드 18](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C18.PNG)

![DEMO 영상](https://github.com/dain2822/Car_Damage_Detection/blob/main/Car_damage_detection_ppt/car_damage_demo%20(1).mp4)






---

### Repository
본 레포지토리에서는 프로젝트의 코드, 데이터 및 기타 문서를 확인하실 수 있습니다.
