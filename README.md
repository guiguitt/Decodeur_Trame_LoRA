# Decodeur_Trame_LoRA
These decoders are designed to process frames arriving on the TTN network.
they must be placed in "payload Formats->decoder" of the TTN application



it is intended for frames containing the information:
* longitude
* latitude
* detection value
* battery level value

## Version
### Decodeur_full
it is the most classic version of each information and precede it with its identifier and the order does not matter nor the presence or not of all the information. This is the most flexible version. 

### Decodeur_10(To be used for the application ```Supagrohydaulic```)
version without identifiers. the order must therefore be respected imperatively.
it accepts 2 types of messages:
-heartbeat (only alert and battery)
-full message (longitude and latitude in addition)
### decodeur_7
planned for soon
decoder reducing the geographical area of GPS coordinates. merging of detection and battery value 
### decodeur_5
reduced to an area of about 100 km 
## fonction ```read```
several functions are declared for reading data of different size and type 
### readInt64BE and readUInt64BE 
these 2 functions read 8 bytes the idx will have to advance by 8 after using them
It's big edian coding. So we start with the most significant bytes. 
```idx +=8 ; ```
### readInt32BE and readUInt32BE 
```idx +=4 ; ```
### readInt16BE and readInt16BE 
```idx +=2 ; ```
### readInt8 and readInt8
```idx +=1 ; ```
### readUInt4H and readUInt4L
it is 2 function is used in a row without advancing the idx. the first reads the 4 most significant bits, the second the least significant 4 bits. 
```idx=1 after the 2```

### readUInt2H and readUInt2L
```
 2 MSB and 6 LSB
idx=1 after the 2 
```
### readbool
```
idx=1
return a Boolean 
```
it is possible to build from these functions all the formats you want 
to send float. multiply the data by the correct power of 10 to obtain an integer. Then we just have to divide during decoding.
