# Decodeur_Trame_LoRA
This decoder is designed for use with TTN. 
it must be placed ```payload Formats->decoder```
il est prévus pour des trame contenant les information:
* longitude
* latitude
* detection value
* battery level value
## Version
### Decodeur_full
it is the most classic version of each information and precede it with its identifier and the order does not matter nor the presence or not of all the information. This is the most flexible version. 
### Decodeur_10
version without identifiers. the order must therefore be respected imperatively.
### decodeur_7
planned for soon
decoder reducing the geographical area of GPS coordinates. merging of detection and battery value 
### decodeur_5
reduced to an area of about 100 km 
 