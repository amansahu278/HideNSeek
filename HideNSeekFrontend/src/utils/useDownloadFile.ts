import { AxiosResponse } from "axios";
import React, { useRef, useState } from 'react';

interface DownloadFileProps {
  readonly isHide: () => boolean;
  readonly apiDefinition: () => Promise<AxiosResponse<Blob>>;
  readonly preDownloading: () => boolean;
  readonly postDownloading: () => void;
  readonly onError: () => void;
  readonly getFileName: () => string;
}

interface DownloadedFileInfo {
  readonly download: () => Promise<void>;
  readonly ref: React.MutableRefObject<HTMLAnchorElement | null>;
  readonly name: string | undefined;
  readonly url: string | undefined;
}

export const useDownloadFile = ({
  isHide,
  apiDefinition,
  preDownloading,
  postDownloading,
  onError,
  getFileName,
}: DownloadFileProps): DownloadedFileInfo => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [url, setFileUrl] = useState<string>();
  const [name, setFileName] = useState<string>();

  const download = async () => {
    try {
      if(!preDownloading()){
        postDownloading();
        return;
      }
      const { data } = await apiDefinition();
      if(isHide()){
        const url = URL.createObjectURL(new Blob([data]));
        console.log(url);
        setFileUrl(url);
        setFileName(getFileName());
        ref.current?.click();
        URL.revokeObjectURL(url);
      } else {
        alert(data);
      }
      postDownloading();
    } catch (error) {
      onError();
    }
  };

  return { download, ref, url, name };
};