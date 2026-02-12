// 判断资源类型
const getFileExtension = (urlString: string) => {
    const match = urlString.match(/\.([a-zA-Z0-9]+)(\?.*)?$/)
    return match ? match[1]!.toLowerCase() : ''
}

export const getFileTypeFromUrl = (urlString: string) => {
    const fileExtension = getFileExtension(urlString)

    if (['mp4', 'avi', 'flv', 'wmv', 'mov', 'mkv', 'webm'].includes(fileExtension))
        return 'video'
    if (['png', 'jpg', 'jpeg', 'webp', 'jfif', 'gif'].includes(fileExtension))
        return 'image'
    return 'file'
}

