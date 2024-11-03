import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { searchUserByCodeAPI } from "../actions/actions";
import { UserResponse } from "../types/types";

const useSearchUserByCode = (
  initialCode: string = "",
  userToken: string | null
) => {
  const [userCode, setUserCode] = useState(initialCode);
  const [searchResults, setSearchResults] = useState<UserResponse["names"]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedCode] = useDebounce(userCode, 300);

  const searchUserByCode = async () => {
    if (!debouncedCode || !userToken) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const data = await searchUserByCodeAPI(debouncedCode, userToken);
      setSearchResults(data.names);
    } catch (error) {
      console.error(error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    searchUserByCode();
  }, [debouncedCode, userToken]);

  return {
    userCode,
    setUserCode,
    setSearchResults,
    searchResults,
    isSearching,
  };
};

export default useSearchUserByCode;
