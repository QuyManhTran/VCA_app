import React, { memo, useState } from "react";
import { Dimensions, Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

const showFullImage = ({ navigation, ...props }) => {
  const onBack = () => {
    navigation.goBack();
  };
  const images = props.route.params.data
    ? [{ url: props.route.params.data.uri }]
    : [
        {
          url: "",
          props: {
            source: require("../../../assets/img/accounts/anhDaiDienAccount.png"),
          },
        },
      ];
  const windowWidth = Dimensions.get("window");
  return (
    // <TouchableOpacity onPress={() => setIsTouchScreen(!isTouchScreen)} style={{margin: 0, padding: 0, backgroundColor: colors.primary}}>
    <Modal
      visible={true}
      presentationStyle="overFullScreen"
      statusBarTranslucent={true}
      transparent={true}
      animationType="slide"
      onRequestClose={() => onBack()}
    >
      <ImageViewer
        style={{
          width: windowWidth.width,
        }}
        imageUrls={images}
        index={0}
        onSwipeDown={() => {
          onBack();
        }}
        enableSwipeDown={true} // Cho phép vuốt xuống để đóng ImageViewer
        // backgroundColor="transparent" // Đặt màu nền của ImageViewer thành trong suốt
        renderIndicator={() => null}
      ></ImageViewer>
    </Modal>
    // </TouchableOpacity>
  );
};

export default memo(showFullImage);
