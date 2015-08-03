# ScaleBook
Musical scale resource website by Leland Jansen.

## Natural language processing
ScaleBook understands natural language meaning you can ask it a query in your own words.

### Some things you can ask ScaleBook
Scales
- C major
- blues on fs
- e double sharp triple flat minor
- G sharp major (gives enharmonically equivalent A-flat major because G-shrap minor cannot be written with a standard key signature)
- OMG just show me a flat miner scale on e (correctly interprets as E-flat minor, not A-flat minor)

Key signatures
- What's the key signature of C-flat major?
- d min ks
- Which modes have a key of 3 flats?
- No sharps or flats
- go to the mixolydian scale with 4 flats

Check
- Is F minor's key signature 1 flat?
- does a# min not have 7 sharps
- c minor has no flats and no sharps, right?

Relative scales
- What is the major of G minor?
- cb maj rel locrian
- show me all the scales relative to d sharp dorian

Random scale
- Generate a random scale
- eb random
- Gimme whatever whole tone scale you want

Fun
- Richter scale
- Decibel scale
- On a scale from 1 to 10...


## Introduction
Before diving into the algorithms, it is important to know a bit of music theory.

Click [here](#Algorithms) to skip the theory.

#### Piano Keyboard
Two octaves of a piano keyboard are shown below. Each octave is comprised of 12 keys, seven white notes and five black nots. A full piano keyboard has 88 keys.
![Piano keyboard](keyboard.jpg)

#### Enharmonics
Two notes are said to be enharmonically equivalent if they have different names but represent the same note. The following are examples of enharmonic equivalents
- C-sharp, D-flat
- F-sharp, D-flat
- B, C-flat
- et cetera

#### Semitones
A semitone is simply the distance between two adjacent notes (white or black). For example, one semitone is the distance between the notes
- C and C-sharp
- E and F
- G and A-flat
- et cetera

A tone is equivalent to two semitones, or the distance between three adjacent notes. For example, one tone is the distance between the notes
- C and D
- E and F-sharp
- B-flat and C
- et cetera

The sharp symbol when placed directly before a note raises that note by one semitone. Similarly, the flat symbol lowers a note by one semitone.

#### Scales
A musical scale is a pattern of notes arranged in ascending or descending order of pitch. For example, the major (ionian) scale follows the semitone pattern

2 | 2 | 1 | 2 | 2 | 2 | 1

A scale may start on any note. The C major scale starts on the note C and follows the major scale pattern. The second note of the scale is two semitones above the first note, the third note is two semitones above the second note, the fourth note is one semitone above the third note, et cetera. Thus, the notes of the C major scale are

C | D | E | F | G | A | B | (C)

ScaleBook knows the following scales
- Major
- Minor
- Ionian
- Dorian
- Phrygian
- Lydian
- Mixolydian
- Aeolian
- Locrian
- Blues
- Chromatic
- Pentatonic (part of major)
- Whole tone

Songs and other musical compositions are usually built upon a scale, meaning the notes in that piece are based on the pitches given by the scale's semitone pattern. Thus, a piece can start on any note and still sound similar. For example, Twinkle Twinkle Little Star is based on the major scale. In C major, the first seven notes are

C | C | G | G | A | A | G

Whereas in G major, the first seven note are

G | G | D | D | E | E | D

Et cetera.

One will notice that the semitone distance between notes in both C major and G major are identical. Therefore, the song will still sound similar despite starting on a different note.

The two most common scales are the major and minor scales, often described as sounding "happy" and "sad", respectively.

#### Key signatures

When writing and reading music, it is often laborious to have each accidental (i.e. sharp or flat) written before each note, especially when written in a key signature with may accidentals. Therefore, music is often written using a key signature - a series of sharps or flats (usually) placed on the music staff right after the clef. The notes on which the key signature accidentals are placed automatically raise/lower that one by one semitone.

For example, the scale E-flat major (notes: E-flat | F | G | A-flat | B-flat | C | D) has a key signature of three flats. Therefore, each time the notes B, E, or A appear, they are to be lowered by one semitone.

Typical key signatures can have up to seven sharps or seven flats.

#### Relative scales
Two scales are said to be relative if they share the same same notes and thus the same key signature. For example, B minor is relative to D major.

D major: D | E | F-sharp | G | A | B | C-sharp

B minor: B | C-sharp | D | E | F-sharp | G | A


## Algorithms
Below are ScaleBook's major algorithms.

### Reverse lookup
(modeConversion array) determineNote, determineScale, determineKeySignature, checkInput

#### (modeConversion array)
#### determineNote
#### determineScale
#### determineKeySignature
#### checkInput

### parseUserInput
(scaleScore array) stringScore, sumScaleScore, zeroScaleScore, getHighestValue

#### (scaleScore array) stringScore
#### sumScaleScore
#### zeroScaleScore
#### getHighestValue
