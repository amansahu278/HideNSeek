import argparse
from pydoc import plain
from steganography import ImageSteg

plaintext = "This is the plain text"
password = "Password is this"
filename = "image.jpg"
destFilename = "encimage.png"

if __name__ == '__main__':
    
    steg = ImageSteg(filename)
    steg.encryptImage(password, plaintext)
    image = steg.getImage()
    image.save(destFilename)

    steg2 = ImageSteg(destFilename)
    image2 = steg2.getImage()

    steg3 = ImageSteg(filename)
    image3 = steg3.getImage()

    count = 0
    for pixel1, pixel3, pixel2 in zip(image.getdata(), image3.getdata(), image2.getdata()):
        if(count > 100): break;
        count += 1
        print(pixel1, pixel3, pixel2)
