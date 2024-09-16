import { useCallback } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";


interface IconProps {
  name: string;
  className?: string;
  style?: any;
}

interface IUploadProps {
  imageUrl?: string;
  onBase64String: (data: string | ArrayBuffer | null) => void;
}

const Icon = (props: IconProps) => {
  const { name, className, style = "" } = props;

  return (
    <svg viewBox="0 0 24 24" className={className} style={style}>
      <use xlinkHref={`/icons/sprite.svg#${name}`} />
    </svg>
  );
};

const ImageTemplateBlank = () => {
  return (
    <Box position="relative">
      <Icon
        name="upload-clip"
        style={{
          fill: "none",
          width: 20,
          position: "absolute",
          right: 0,
        }}
      />
      <Icon name="upload" style={{ fill: "none", width: 64 }} />
    </Box>
  );
};



function parseUploadFiles(
  file: File,
  callback: (value: string | ArrayBuffer | null) => void
) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    callback(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

const FileUploader = (props: IUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    parseUploadFiles(acceptedFiles[0], (value) => {
      props.onBase64String(value);
    });

    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      border="1px solid rgba(94, 109, 250, 0.3)"
      rounded="8px"
      width="50%"
      px="5"
      py="4"
      mb="7"
      {...getRootProps()}
    >
      <input style={{ display: "none" }} {...getInputProps()} />
      <Flex alignItems="center" columnGap="2.5">
        {!props.imageUrl ? (
          <ImageTemplateBlank />
        ) : (
          <Box height="64px" width="64px" position="relative" rounded="full">
            <Image
              src={props.imageUrl}
              alt="company logo"
              style={{ borderRadius: "100%" }}
              fill
            />
          </Box>
        )}

        <Text fontSize={10} color="#5E6DFA">
          Upload company logo
        </Text>
      </Flex>
    </Box>
  );
};

export default FileUploader;
