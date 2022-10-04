class Sorter:
    def __init__(self):
        pass

    def sort(self, arr = [], n = 0):
        pass

class BubbleSorter(Sorter):
    def sort(self, arr=[], n = 0):
        if len(arr) == 0:
            print('Array is empty!')
            return

        for ix in range(len(arr)):
            for iy in range(ix + 1, len(arr)):
                if arr[ix] > arr[iy]:
                    arr[ix], arr[iy] = arr[iy], arr[ix]
        return reportDone(arr)

class InsertionSorter(Sorter):
    def sort(self, arr=[], n = 0):
        if len(arr) == 0:
            print('Array is empty!')
            return

        for ix in range(1, len(arr)):
            key = arr[ix]

            pix = ix - 1

            while pix >= 0 and key < arr[pix]:
                arr[pix + 1] = arr[pix]
                pix -= 1
            
            arr[pix + 1] = key
        return reportDone()

class SelectionSorter(Sorter):
    def sort(self, arr=[], n = 0):
        if len(arr) == 0:
            return
    
        for i in range(len(arr)):
        
        # Find the minimum element in remaining
        # unsorted array
            min_idx = i
            
            for j in range(i + 1, len(arr)):
                if arr[min_idx] > arr[j]:
                    min_idx = j
                    
        # Swap the found minimum element with
        # the first element       
            arr[i], arr[min_idx] = arr[min_idx], arr[i]

        return reportDone()

class ShellSorter(Sorter):
    def sort(self, arr = [], n = 0):
        gap = n // 2

        while gap > 0:
            j = gap
            # Check the array in from left to right
            # Till the last possible index of j
            while j < n:
                i = j - gap # This will keep help in maintain gap value
                
                while i >= 0:
                    # If value on right side is already greater than left side value
                    # We don't do swap else we swap
                    if arr[i + gap] > arr[i]:
                        break
                    else:
                        arr[i + gap], arr[i] = arr[i], arr[i + gap]
    
                    i = i - gap # To check left side also
                                # If the element present is greater than current element 
                j += 1
            gap = gap // 2

        return reportDone()

def reportDone(arr):
    return arr