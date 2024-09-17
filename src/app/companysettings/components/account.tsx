"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { getCompanyInfoData, updateProfileData } from "@/services";
import FileUploader from "@/components/file-uploader";
import Loader from "@/components/loader";

const Account = () => {
  const [companyProfile, setCompanyProfile] = useState({
    company_name: "",
    contact_name: "",
    contact_email: "",
    industry: "",
    company_logo_b64: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const industryOptions = [
   "Information Technology (IT) and Software Services",
    "Finance and Banking",
    "Retail and Consumer Goods",
    "Manufacturing and Industrial Production",
    "Healthcare and Pharmaceuticals",
    
  ];

  useEffect(() => {
    (async () => {
      try {
        const { data: response } = await getCompanyInfoData();
        setCompanyProfile({
          company_name: response.display_name,
          contact_name: response.profile.contact_name,
          contact_email: response.profile.contact_email,
          industry: response.profile.industry,
          company_logo_b64: response.profile.company_logo,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleChange = (key: string, value: string) => {
    setCompanyProfile((state) => ({ ...state, [key]: value }));
  };

  const handleSendToApi = async () => {
    try {
      setIsSubmitting(true);
      const response = await updateProfileData(companyProfile);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };



  if (isLoading)
    return (
      <Box>
        <Loader />
      </Box>
    );

  return (
    <Box
      bg="white"
      rounded="24px"
      border="1px solid rgba(202, 206, 225, 0.2)"
      px="8"
      pt="4"
      pb="14"
    >
      <Text
        as="h2"
        fontSize="20px"
        fontWeight="500"
        borderBottom="solid"
        borderBottomColor="#AEADBE"
        borderBottomWidth="0.3px"
        pb="3"
        mb="7"
      >
        Account
      </Text>

      <FormControl width="50%" mb="5">
        <FormLabel color="#5D5F6D" fontSize="13px" mb="1.5" fontWeight={400}>
          Company name
        </FormLabel>

        <Input
          type="text"
          bg="#FCFCFE"
          border="1px solid rgba(94, 109, 250, 0.1)"
          height={42}
          value={companyProfile?.company_name}
          onChange={(e) => handleChange("company_name", e.target.value)}
        />
      </FormControl>

      <FormControl width="50%" mb="5">
        <FormLabel color="#5D5F6D" fontSize="13px" mb="1.5" fontWeight={400}>
          Contact name
        </FormLabel>
        <Input
          type="text"
          bg="#FCFCFE"
          border="1px solid rgba(94, 109, 250, 0.1)"
          height={42}
          value={companyProfile?.contact_name}
          onChange={(e) => handleChange("contact_name", e.target.value)}
        />
      </FormControl>

      <FormControl width="50%" mb="5">
        <FormLabel color="#5D5F6D" fontSize="13px" mb="1.5" fontWeight={400}>
          Email
        </FormLabel>
        <Input
          type="text"
          bg="#FCFCFE"
          border="1px solid rgba(94, 109, 250, 0.1)"
          height={42}
          value={companyProfile?.contact_email}
          onChange={(e) => handleChange("contact_email", e.target.value)}
        />
      </FormControl>

      <FormControl width="50%" mb="5">
        <FormLabel color="#5D5F6D" fontSize="13px" mb="1.5" fontWeight={400}>
          Industry
        </FormLabel>

        <Select
          bg="#FCFCFE"
          border="1px solid rgba(94, 109, 250, 0.1)"
          height={42}
          value={companyProfile?.industry}
          onChange={(e) => handleChange("industry", e.target.value)}
        >
          {industryOptions.map((industry) => (
            <option value={industry} key={industry}>
              {industry}
            </option>
          ))}
        </Select>
      </FormControl>

      <Text fontSize={13} color="#5D5F6D" mb="1.5">
        Company Logo
      </Text>

      <FileUploader
        imageUrl={companyProfile.company_logo_b64}
        onBase64String={(value) =>
          handleChange("company_logo_b64", value as string)
        }
      />

      <Button
        border="1px solid #5E6DFA"
        bg="white"
        rounded="30px"
        fontSize={10}
        height={27}
        color="#5E6DFA"
        onClick={handleSendToApi}
      >
        {!isSubmitting ? "Save changes" : "Submitting..."}
      </Button>
    </Box>
  );
};

export default Account;
