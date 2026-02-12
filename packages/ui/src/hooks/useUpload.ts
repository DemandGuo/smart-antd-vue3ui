import { ref } from 'vue'


const customRequest = async (fileObj: any, fetch: any) => {
  const { file, onSuccess, onError } = fileObj
  try {
    const resUpInfo = await fetch(file)
    onSuccess(resUpInfo)
  }
  catch (error) {
    onError()
  }
}

const useUpload = () => {
  const fileList = ref<any[]>([])
  const handleChange = (info: any) => {
    let resFileList = [...info.fileList]
    resFileList = resFileList.map((file) => {
      if (file.response)
        file.url = file.response
      return file
    })

    fileList.value = resFileList
  }
  return {
    fileList,
    customRequest,
    handleChange
  }
}

export default useUpload

