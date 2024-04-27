Imports System.Data.OleDb

Public Class Form4
    Dim connectionstring As String
    Dim dbconnection As OleDbConnection
    Dim dbadapter As New OleDbDataAdapter
    Dim dbdataset, dbdatasetstud, dbdatasetCourse, dbdatasetSubject As New DataSet

    Private Sub Form4_FormClosed (sender As Object, e As FormClosedEventArgs) Handles Me.FormClosed
        MainForm.Enabled() = True
        MainForm.Show()
        Me.Hide()
    End Sub

    Private Sub Form4_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        Me.Text = "Enrollment"
        DisplayNorm()
        DataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill
    End Sub

    Private Sub DisplayNorm()
        Label1.Text = "Enrollment ID"
        Label2.Text = "Student ID"
        Label3.Text = "Name"
        Label4.Text = "Course Code"
        Label5.Text = "Title"
        Label7.Text = "Subject Code"
        Label6.Text = "Description"
        Label8.Text = "Units"
        Label9.Text = "Date"
        TextBox1.Enabled = False
        TextBox2.Enabled = False
        TextBox3.Enabled = False
        TextBox4.Enabled = False
        TextBox5.Enabled = False
        TextBox6.Enabled = False 'Swapped position with TextBox7 in [Design]
        TextBox7.Enabled = False 'Swapped position with TextBox6 in [Design]
        TextBox8.Enabled = False
        TextBox1.Text = vbNullString
        TextBox2.Text = vbNullString
        TextBox3.Text = vbNullString
        TextBox4.Text = vbNullString
        TextBox5.Text = vbNullString
        TextBox6.Text = vbNullString
        TextBox7.Text = vbNullString
        TextBox8.Text = vbNullString
        Button1.Text = "Add"
        Button2.Text = "Edit"
        Button3.Text = "Delete"
        Button1.Enabled = True
        Button2.Enabled = True
        Button3.Enabled = True
        DataGridView1.AllowUserToAddRows = False

        connectionstring = "Provider = Microsoft.Jet.OLEDB.4.0; Data Source = student.mdb;"
        dbconnection = New OleDbConnection(connectionstring)
        Try
            dbconnection.Open()
            dbdataset.Clear()
            dbadapter = New OleDbDataAdapter("Select * from Enroll",
            connectionstring)
            dbadapter.Fill(dbdataset, "Enroll")
            DataGridView1.DataSource = dbdataset.Tables("Enroll").DefaultView
            dbconnection.Close()
            Label10.Text = "Connected"
            Label10.ForeColor = Color.LimeGreen
        Catch ex As Exception
            Label10.Text = "Disconnected"
            Label10.ForeColor = Color.Red
        End Try
    End Sub

    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        If Button1.Text = "Add" Then
            Button1.Enabled = False
            Button2.Text = "Save"
            Button3.Text = "Cancel"
            TextBox2.Text = vbNullString
            TextBox4.Text = vbNullString
            TextBox6.Text = vbNullString
            TextBox2.Enabled = True
            DataGridView1.AllowUserToAddRows = True
        ElseIf Button1.Text = "Save" Then
            dbconnection.Open()
            Dim dbcommand As New OleDbCommand("UPDATE Enroll SET 
                STUD_ID = '" & TextBox2.Text.Trim & "', 
                COURSE_CODE = '" & TextBox4.Text.Trim & "', 
                SUBJECT_CODE = '" & TextBox6.Text.Trim & "',
                DATE_ENROLLED = '" & DateTimePicker1.Value & "'
                WHERE ENROLLMENT_ID = " & TextBox1.Text & " ", dbconnection)
            dbcommand.ExecuteNonQuery()
            dbcommand.Dispose()
            dbconnection.Close()
            DisplayNorm()
            MsgBox("Record Save", vbInformation, "Update")
        End If
    End Sub

    Private Sub Button2_Click(sender As Object, e As EventArgs) Handles Button2.Click
        If Button2.Text = "Edit" Then
            Button2.Enabled = False
            Button1.Text = "Save"
            Button3.Text = "Cancel"
            TextBox4.Enabled = True
            TextBox6.Enabled = True
        ElseIf Button2.Text = "Save" Then
            If (TextBox2.Text <> vbNullString And TextBox4.Text <> vbNullString And TextBox6.Text <> vbNullString) Then
                dbconnection.Open()
                Dim dbcommand As New OleDbCommand("INSERT INTO Enroll(STUD_ID, COURSE_CODE, SUBJECT_CODE, DATE_ENROLLED) 
                    VALUES ('" + TextBox2.Text.Trim + "','" + TextBox4.Text.Trim + "','" + TextBox6.Text.Trim + "','" + DateTimePicker1.Value + "')", dbconnection)
                dbcommand.ExecuteNonQuery()
                dbcommand.Dispose()
                dbconnection.Close()
                DisplayNorm()
                MsgBox("Successful", vbInformation, "Add Record")
            ElseIf (TextBox2.Text = vbNullString) Then
                MsgBox("Enter Student ID", vbCritical, "Missing")
            ElseIf (TextBox4.Text = vbNullString) Then
                MsgBox("Enter Course_Code", vbCritical, "Missing")
            ElseIf (TextBox6.Text = vbNullString) Then
                MsgBox("Enter Subject Code", vbCritical, "Missing")
            End If
        ElseIf Button2.Text = "Cancel" Then
            DisplayNorm()
        End If
    End Sub

    Private Sub TextBox6_TextChanged(sender As Object, e As EventArgs) Handles TextBox6.TextChanged
        dbconnection.Open()
        dbdatasetSubject.Clear()
        dbadapter = New OleDbDataAdapter("Select * from SUBJECT where SUBJECT_CODE like '" & TextBox6.Text.Trim & "'", dbconnection)
        dbadapter.Fill(dbdatasetSubject, "SUBJECT")
        If dbdatasetSubject.Tables("SUBJECT").DefaultView.Count <> 0 And TextBox6.Text <> vbNullString Then
            dbconnection.Close()
            TextBox7.Text = dbdatasetSubject.Tables("SUBJECT").DefaultView.Item(0).Item(1)
            TextBox8.Text = dbdatasetSubject.Tables("SUBJECT").DefaultView.Item(0).Item(2)
        Else
            TextBox7.Text = vbNullString
            TextBox8.Text = vbNullString
            dbconnection.Close()
        End If
        dbconnection.Close()
    End Sub

    Private Sub TextBox4_TextChanged(sender As Object, e As EventArgs) Handles TextBox4.TextChanged
        dbconnection.Open()
        dbdatasetCourse.Clear()
        dbadapter = New OleDbDataAdapter("Select * from COURSE where COURSE_CODE like '" & TextBox4.Text.Trim & "'", dbconnection)
        dbadapter.Fill(dbdatasetCourse, "COURSE")
        If dbdatasetCourse.Tables("COURSE").DefaultView.Count <> 0 And TextBox4.Text <> vbNullString Then
            dbconnection.Close()
            TextBox5.Text = dbdatasetCourse.Tables("COURSE").DefaultView.Item(0).Item(1)
            If Button2.Text = "Save" Then
                TextBox6.Enabled = True
            End If
        Else
            TextBox5.Text = vbNullString
            TextBox6.Enabled = False
            dbconnection.Close()
        End If
    End Sub

    Private Sub TextBox2_TextChanged(sender As Object, e As EventArgs) Handles TextBox2.TextChanged
        dbconnection.Open()
        dbdatasetstud.Clear()
        dbadapter = New OleDbDataAdapter("Select * from StudInfo where STUD_ID like '" & TextBox2.Text & "%'", dbconnection) 
        dbadapter.Fill(dbdatasetstud, "StudInfo")

        If dbdatasetstud.Tables("Studinfo").DefaultView.Count <> 0 And TextBox2.Text <> vbNullString Then
            dbconnection.Close()
            Dim fn, ln, mn As String
            fn = dbdatasetstud.Tables("StudInfo").DefaultView.Item(0).Item(1)
            mn = dbdatasetstud.Tables("StudInfo").DefaultView.Item(0).Item(2)
            ln = dbdatasetstud.Tables("StudInfo").DefaultView.Item(0).Item(3)
            TextBox3.Text = fn + " " + mn + " " + ln
            If Button2.Text = "Save" Then
                TextBox4.Enabled = True
            End If
        Else
            TextBox3.Text = vbNullString 
            TextBox4.Enabled = False 
            dbconnection.Close()
        End If
        Exit Sub
        dbconnection.Close()
    End Sub

    Private Sub DataGridView1_CellClick(sender As Object, e As DataGridViewCellEventArgs) Handles DataGridView1.CellClick
        TextBox1.Text = DataGridView1.CurrentRow.Cells(0).Value 
        TextBox2.Text = DataGridView1.CurrentRow.Cells(1).Value
        TextBox4.Text = DataGridView1.CurrentRow.Cells(2).Value
        TextBox6.Text = DataGridView1.CurrentRow.Cells(3).Value
    End Sub

    Private Sub Button3_Click(sender As Object, e As EventArgs) Handles Button3.Click
        If Button3.Text = "Delete" Then
            Button1.Enabled = False
            Button2.Enabled = False
            Button3.Enabled = False
            Dim Response = MsgBox("Are you sure to delete the record?", vbYesNo, "Confirmation")
            If Response = vbYes Then
                dbconnection.Open()
                Dim dbcommand As New OleDbCommand("DELETE FROM Enroll WHERE ENROLLMENT_ID = " & TextBox1.Text & " ", dbconnection)
                dbcommand.ExecuteNonQuery()
                dbcommand.Dispose()
                dbconnection.Close()
                DisplayNorm()
                MsgBox("Record was permanently deleted", vbInformation, "Successful")
            Else
                DisplayNorm()
            End If
            DisplayNorm()
        Else
            DisplayNorm()
        End If
    End Sub

End Class
