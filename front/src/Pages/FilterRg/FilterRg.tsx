/// <reference types="@types/geojson" />

import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import axios from "../../store/baseURL";

import Navbar from "../../Common/Navbar/Navbar";
// import ResultList from "../../Common/Result/ResultList";

import { Slider } from "@mui/material/";


interface Option {
  value: string;
  label: string;
}

interface UserLocation {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}



// 위치정보 받아오기 관련 레거시 코드2
// interface IPosition {
//   latitude: number;
//   longitude: number;
// }


function FilterRg() {
  // 위치정보 받아오기 관련 레거시 코드2
  //   function getLocation(): Promise<IPosition> {
  //     return new Promise((resolve, reject) => {
  //       navigator.geolocation.getCurrentPosition(
  //         position => {
  //           const { latitude, longitude } = position.coords;
  //           resolve({ latitude, longitude });
  //           console.log(latitude, longitude)
  //         },
  //         error => reject(error)
  //       );
  //     });
  //   }

  // 탭 버튼으로 지역/위치 선택
  const [rgBtn, setRgBtn] = useState(1);
  const [locBtn, setLocBtn] = useState(0);

  function ChangeTab() {
    // 유저 위치정보 받아오기 레거시코드 4
    // const Geo = () => {
    //   if (!navigator.geolocation) {
    //     setLocation({ latitude: null, longitude: null, error: "Geolocation이 브라우저에서 작동하지 않음" });
    //     return;
    //   }

    //   const success = (position:any) => {
    //     setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, error: null });
    //   };

    //   const error = () => {
    //     setLocation({ latitude: null, longitude: null, error: "Geolocation 에러" });
    //   };

    //   navigator.geolocation.getCurrentPosition(success, error);
    //   console.log('위치 받아옴')
    // }

    // 위치정보 받아오기 관련 레거시 코드1
    // function Geo(): UserLocation {
    //   // const [location, setLocation] = useState<UserLocation>({ latitude: null, longitude: null, error: null });

    //   useEffect(() => {
    //     if (!navigator.geolocation) {
    //       setLocation({ latitude: null, longitude: null, error: "Geolocation is not supported by your browser" });
    //       return;
    //     }

    //     const success = (position: any) => {
    //       setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, error: null });
    //     };

    //     const error = () => {
    //       setLocation({ latitude: null, longitude: null, error: "Unable to retrieve your location" });
    //     };

    //     navigator.geolocation.getCurrentPosition(success, error);
    //   }, []);

    //   return location;
    // }

    // 지역 -> 위치 : 탭 변경하며 유저 위치와 반경 정보 받아오기
    if (rgBtn === 1) {
      setRgBtn(0);
      setLocBtn(1);
      handleMt("", "courseLocation");
      // Geo();
      // 볼륨바0

      // 위치 -> 지역 : 탭 변경하며 유저 위치와 반경 null
    } else if (locBtn === 1) {
      setRgBtn(1);
      setLocBtn(0);
      setLocation({ latitude: null, longitude: null, error: null });
      handleMt(0, "courseRadius")
      setVolVal(0)
    }

    // console.log('rgBtn :', rgBtn, 'locBtn: ', locBtn, 'location :', location.latitude, location.longitude)
  }

  // 지역기반 드랍박스 목록
  const regions: Option[] = [
    { value: "", label: "지역을 선택해주세요" },
    { value: "서울", label: "서울시" },
    { value: "부산", label: "부산시" },
    { value: "대구", label: "대구시" },
    { value: "인천", label: "인천시" },
    { value: "광주", label: "광주시" },
    { value: "대전", label: "대전시" },
    { value: "울산", label: "울산시" },
    { value: "세종", label: "세종시" },
    { value: "경기", label: "경기도" },
    { value: "강원", label: "강원도" },
    { value: "충북", label: "충청북도" },
    { value: "충남", label: "충청남도" },
    { value: "전북", label: "전라북도" },
    { value: "전남", label: "전라남도" },
    { value: "경북", label: "경상북도" },
    { value: "경남", label: "경상남도" },
    { value: "제주", label: "제주도" },
  ];

  // 지역명 갱신
  const SelectRegion = (
    event: React.ChangeEvent<HTMLSelectElement>,
    type: string
  ) => {
    handleMt(event.target.value, type);
  };

  // 유저 위치정보 받아오기 레거시코드 3
  //   function Geo() {

  //   if (!navigator.geolocation) {
  //     setLocation({ latitude: null, longitude: null, error: "Geolocation이 브라우저에서 작동하지 않음" });
  //     return;
  //   }

  //   const success = (position:any) => {
  //     setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, error: null });
  //   };

  //   const error = () => {
  //     setLocation({ latitude: null, longitude: null, error: "Geolocation 에러" });
  //   };

  //   navigator.geolocation.getCurrentPosition(success, error);

  // }
  // useEffect(() => {
  //   handleMt(location.latitude, "coordX");
  //   handleMt(location.longitude, "coordY");
  //   console.log('위치넣기', location.latitude, location.longitude)
  // }, [location])

  // 반경정보 받아오기
  const [volval, setVolVal] = useState<number>(0)

  const volChange = (event: any, newValue: number | number[]) => {
    setVolVal(newValue as number); // Update the state variable when the slider's value changes
  };
    


  // 지역/위치 이하---------------------------------------

  const time: string[] = ["전체", "1미만", "1-2", "2초과"];
  const [onTime, setOnTime] = useState<number>(0);

  const length: string[] = ["전체", "1미만", "1-3", "3-5", "5초과"];
  const [onLength, setOnLength] = useState<number>(0);

  const [searchRg, setSearchRg] = useState<object>({
    courseLocation: "",
    coordX: null,
    coordY: null,
    courseRadius: 0,
    courseLengthBtNo: 0,
    courseTimeBtNo: 0,
  });

  const handleMt = (data: string | number | null, type: string) => {
    setSearchRg({
      ...searchRg,
      [type]: data,
    });
    // console.log('handleMt에서 콘솔')
    // console.log(searchRg)
  };

  function initializer() {
    setSearchRg({
      courseLocation: "",
      coordX: null,
      coordY: null,
      courseRadius: 0,
      courseLengthBtNo: 0,
      courseTimeBtNo: 0,
    });
    setRgBtn(1);
    setLocBtn(0)
    // ChangeTab();
  }

  const [location, setLocation] = useState<UserLocation>({
    latitude: null,
    longitude: null,
    error: null,
  });



  // # 현재위치 정보 받아와서 searchRg에 넣기

  function GetGeo () {
    // return new Promise((resolve, reject) => {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(resolve, reject);
        
    //   } else {
    //     reject(new Error('Geolocation is not supported'));
    //   }
    // })

    // 작동 잘하던 GetGeo코드
    if (!navigator.geolocation) {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation이 브라우저에서 작동하지 않음",
      });
      // return;
    }

    const success = (position: any) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    };

    const error = () => {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation 에러",
      });
    };

    navigator.geolocation.getCurrentPosition(success, error);
    console.log("위치 받아옴");
  };

  function GetGeoCehck () {
    console.log("위치 들어옴");
    console.log(location.latitude, location.longitude);
  };

  function AddGeoX() {
    handleMt(location.latitude, "coordX");
  };

  function AddGeoY() {
    handleMt(location.longitude, "coordY");
  };

  function AddGeoCheck() {
    console.log("리스트에 들어감");
    console.log(searchRg);
  };

  function AddVol(){
    handleMt(volval, "courseRadius")
  }

  function SearchSinal() {
    if (rgBtn === 1){
      // console.log('지역검색')
      // if (|)
    } else if (locBtn === 1){
      console.log('위치검색')
    }


    // GetGeo()
    // console.log(location)


    // GetGeo()
    //   .then(GetGeoCehck)
    //   .then(AddGeoX)
    //   .then(AddGeoY)
    //   .then(AddGeoCheck)
    //   .then(AddVol)
    //   .catch((error) => {
    //     console.log(error)
    //   })
  };
  



  function getLocation() {
    console.log(searchRg);
  }

  return (
    <div>
      {/* <Navbar /> */}
      <StyledP2>원하는 등산코스 조건을 선택해주세요</StyledP2>
      <TabDiv>
        {rgBtn === 1 ? (
          <Tab1>지역검색</Tab1>
        ) : (
          <UnTab1 onClick={ChangeTab}>지역검색</UnTab1>
        )}
        {locBtn === 1 ? (
          <Tab2>현재위치</Tab2>
        ) : (
          <UnTab2
            onClick={
              ChangeTab
              // Geo();}
            }
          >
            현재위치
          </UnTab2>
        )}
        {rgBtn === 1 ? (
          <TabcontentRg>
            <StyledDiv2>
              <StyledSelect
                onChange={(event) => SelectRegion(event, "courseLocation")}
              >
                {regions.map((region) => (
                  <StyledOption
                    value={region.value}
                    key={region.value}
                    // onClick={() => handleMt(region.value, 'courseLocation')}
                  >
                    {region.label}
                  </StyledOption>
                ))}
              </StyledSelect>
            </StyledDiv2>
          </TabcontentRg>
          ) : 
          (
            <TabcontentLoc>
            <VolBarDiv>
              <VolP>
                반경
                (km)  
              </VolP>
              <SliderDiv>
                <Slider
                  // color="primary"
                  aria-label="Temperature"
                  defaultValue={0}
                  // getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  step={1}
                  marks={true}
                  min={0}
                  max={30}
                  value={volval}
                  onChange={volChange}
                />
              </SliderDiv>
            </VolBarDiv>
          </TabcontentLoc>
          )}
      </TabDiv>

      {/* -------------------------------------------------- */}

      {/* 산행 시간 */}
      <StyledP>산행 시간 (h)</StyledP>
      <StyledDiff>
        {time.map((data, index) => {
          return (
            <StyledBtn
              key={index}
              onClick={() => {
                handleMt(index, "courseTimeBtNo");
                setOnTime(index);
              }}
              onTime={onTime}
              index={index}
            >
              {data}
            </StyledBtn>
          );
        })}
      </StyledDiff>
      <StyledHr />

      {/* 코스 길이 */}
      <StyledP>코스 길이 (km)</StyledP>
      <StyledDiff>
        {length.map((data, index) => {
          return (
            <StyledBtn1
              key={index}
              onClick={() => {
                handleMt(index, "courseLengthBtNo");
                setOnLength(index);
              }}
              onLength={onLength}
              index={index}
            >
              {data}
            </StyledBtn1>
          );
        })}
      </StyledDiff>
      <StyledHr />

      <StyledDiv>
        <StyledBtn2 onClick={SearchSinal}>검색</StyledBtn2>
        <StyledBtn3
          onClick={() => {
            setOnTime(0);
            setOnLength(0);
            setVolVal(0);
            initializer();
          }}
        >
          초기화
        </StyledBtn3>
        <button onClick={getLocation}>실험</button>
      </StyledDiv>

      {/* <ResultList />       */}
    </div>
  );
}

// const StyledDiv = styled.div`
//   padding-top: 40%;
//   height: 100vh;
//   font-family: "GmarketSansLight";
// `;

const StyledP2 = styled.p`
  color: black;
  margin-top: 30px;
  margin-left: 25px;
  margin-bottom: 15px;
  font-size: 19px;
  font-family: "GmarketSansMedium";
`;

const TabDiv = styled.div`
  width: 93vw;
  height: 36vw;
  margin-left: 3.5vw;
  border-radius: 20px;
  background-color: #cfe2c8;
  font-family: "GmarketSansMedium";
  margin-top : 5vw;
  margin-bottom : 10vw;
`;
const Tab1 = styled.button`
  width: 45vw;
  height: 13vw;
  margin-left: 1.5vw;
  margin-top: 1.5vw;
  border-top-right-radius : 20px;
  border-top-left-radius : 20px;
  border: none;
  background-color: white;
  // box-shadow: 3px 3px 3px #818181 inset;
  font-size: 6vw;
`;
const UnTab1 = styled.button`
  width : 45vw;
  height : 13vw;
  margin-left : 1.5vw;
  margin-top : 1.5vw;
  border-top-right-radius : 20px;
  border-top-left-radius : 20px;
  border : none;
  background-color: #CFE2C8;
  font-size : 6vw;
  &: hover{
    cursor : pointer;
`;
const Tab2 = styled.button`
  width: 45vw;
  height: 13vw;
  // margin-left : 4vw;
  margin-top: 1.5vw;
  border-top-right-radius : 20px;
  border-top-left-radius : 20px;
  border: none;
  background-color: white;
  // box-shadow: 3px 3px 3px #818181 inset;
  font-size: 6vw;
`;

const UnTab2 = styled.button`
  width : 45vw;
  height : 13vw;
  // margin-left : 4vw;
  margin-top : 1.5vw;
  border-top-right-radius : 20px;
  border-top-left-radius : 20px;
  border : none;
  background-color: #CFE2C8;
  font-size : 6vw;
  &: hover{
    cursor : pointer;
`;
const TabcontentRg = styled.div`
  width: 90vw;
  height: 20vw;
  margin-left: 1.5vw;
  // margin-top: 1vw;
  background-color: white;
  // border : 1px solid #CFE2C8;
  // border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TabcontentLoc = styled.div`
  width: 90vw;
  height: 20vw;
  margin-left: 1.5vw;
  // margin-top: 1vw;
  background-color: white;
  // border : 1px solid #CFE2C8;
  border-top-left-radius: 20px;
  // border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledH1 = styled.div`
  text-align: center;
  padding: 4vw;
`;

const StyledSpace = styled.div`
  margin-top: 10%;
`;

const StyledDiv2 = styled.div`
  // margin-bottom: 4%;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 75vw;
  height: 5vh;
  padding: 12px 12px;
  border-radius: 10px;
`;

const StyledSelect = styled.select`
  width: 80vw;
  height: 6vh;
  border: 3px solid black;
  border-radius: 10px;
  overflow-y: auto;
  font-size: 6vw;
`;

const StyledOption = styled.option`
  overflow-y: scroll;
  font-size: 4vw;
`;

const VolP = styled.p`
  font-size : 5vw;
  padding-top : 5vw;
`

const SliderDiv = styled.div`
  width : 75vw;
  // padding-top : 4vw;
  && {
    color: #1B954C;
    height: 16vw;
    padding: 13px 0;
  }

  && .MuiSlider-rail {
    height: 3vw;
    opacity: 1;
    background-color: #BDBDBD;
  }

  && .MuiSlider-track {
    height: 3vw;
    opacity: 1;
    background-color: #1B954C;
  }

  && .MuiSlider-thumb {
    width: 6vw;
    height: 6vw;
    background-color: #1B954C;
    border: 2px solid #fff;
    margin-top: -0.4vw;
    margin-left: -10px;

    &:focus,
    &:hover,
    &:active {
      box-shadow: 0 0 0 8px rgba(27, 149, 76, 0.16);
    }

    &.Mui-focusVisible {
      box-shadow: 0 0 0 8px rgba(27, 149, 76, 0.16);
    }
  }
`

const VolBarDiv = styled.div`
  width: 80vw;
  font-size: 7vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


// ----------------------------------------

const StyledP = styled.p`
  color: black;
  margin-left: 20px;
  margin-bottom: 8px;
  font-size: large;
  font-family: "GmarketSansMedium";
`;

const StyledDiff = styled.div`
  margin-left: 15px;
`;

const StyledHr = styled.hr`
  margin-left: 15px;
  width: 90%;
  border: 1px solid #e3e3e3;
`;

const StyledBtn = styled.button<{ onTime: number; index: number }>`
  width: 20vw;
  height: 30px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 3px 3px rgba(0, 0, 0, 0.22);
  color: ${(props) => (props.index === props.onTime ? "#238C47" : "#818181")};
  border: 2px solid
    ${(props) => (props.index === props.onTime ? "#238C47" : "#818181")};
  font-size: 15px;
  font-family: "GmarketSansMedium";
  border-radius: 13px;
  margin: 5px;
`;

const StyledBtn1 = styled.button<{ onLength: number; index: number }>`
  width: 16.5vw;
  height: 30px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 3px 3px rgba(0, 0, 0, 0.22);
  color: ${(props) => (props.index === props.onLength ? "#238C47" : "#818181")};
  border: 2px solid
    ${(props) => (props.index === props.onLength ? "#238C47" : "#818181")};
  font-size: 15px;
  font-family: "GmarketSansMedium";
  border-radius: 13px;
  margin: 3px;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledBtn2 = styled.button`
  width: 23%;
  background-color: #238c47;
  color: white;
  font-family: "GmarketSansMedium";
  font-size: 17px;
  border: none;
  border-radius: 5px;
  padding-top: 8px;
  padding-bottom: 5px;
  margin-right: 20px;
`;

const StyledBtn3 = styled.button`
  width: 23%;
  background-color: white;
  color: #818181;
  font-family: "GmarketSansMedium";
  font-size: 17px;
  border: 2px solid #818181;
  border-radius: 5px;
  padding-top: 8px;
  padding-bottom: 5px;
`;

export default FilterRg;
